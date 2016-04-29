package at.ac.tuwien.dst.mms.dal.jama;

import at.ac.tuwien.dst.mms.dal.jama.dto.*;
import at.ac.tuwien.dst.mms.dal.repo.GeneralNodeRepository;
import at.ac.tuwien.dst.mms.model.GeneralNode;
import org.neo4j.graphdb.Transaction;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.core.GraphDatabase;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Created by XLin on 28.04.2016.
 */
@Service
public class JamaActivitiesDTOWriter {
	@Autowired
	private GeneralNodeRepository generalNodeRepository;

	@Autowired
	private JamaRestClient restClient;

	@Autowired
	private JamaNodeDTOWriter nodeDTOWriter;

	@Autowired
	private JamaRelationshipDTOWriter relationshipDTOWriter;

	@Autowired
	private Neo4jTemplate neo4jTemplate;

	@Autowired
	private GraphDatabase graphDatabase;

	@Autowired(required = false)
	Logger logger;

	public void handle(List<JamaActivityDTO> activities) {
		Map<Long, Set<ObjectType>> processed = new HashMap<>();

		try (Transaction tx = graphDatabase.beginTx()) {
			for (JamaActivityDTO activity : activities) {
				//logger.info("Processing activity " + activity.toString());
				Set<ObjectType> processedTypes = processed.containsKey(activity.getItem()) ? processed.get(activity.getItem()) : new HashSet<>();

				if (!processedTypes.contains(activity.getObjectType())) {
					GeneralNode item = generalNodeRepository.findByJamaId(activity.getItem());

					if (activity.getObjectType() == ObjectType.ITEM) {
						if (activity.getEventType() == EventType.CREATE && item == null) {
							//logger.info("fetching node for CREATE event...");
							JamaNodeDTO node = restClient.getItem(activity.getItem());
							//logger.info("node with id " + activity.getItem() + "fetched for CREATE event");

							if (node != null) {
								nodeDTOWriter.write(node);
							}
						} else if (activity.getEventType() == EventType.UPDATE) {
							//logger.info("fetching node for UPDATE event...");
							JamaNodeDTO node = restClient.getItem(activity.getItem());
							//logger.info("node with id " + activity.getItem() + "fetched for UPDATE event");

							if (node != null) {
								nodeDTOWriter.write(node);
							}
						} else if (activity.getEventType() == EventType.DELETE && item != null) {
							JamaNodeDTO dto = new JamaNodeDTO();
							dto.setJamaId(item.getJamaId());

							//logger.info("deleting dto");
							nodeDTOWriter.delete(dto);
							//logger.info("dto deleted");
						}
					} else if (activity.getObjectType() == ObjectType.RELATIONSHIP) {
						if (item != null) {
							this.deleteRelationships(item);
							this.addRelationships(item);
						} else if (activity.getEventType() == EventType.CREATE || activity.getEventType() == EventType.UPDATE) {
							//logger.info("fetching item for relationship with event type " + activity.getEventType());
							JamaNodeDTO node = restClient.getItem(activity.getItem());
							//logger.info("node with id " + activity.getItem() + " fetched for relationship");

							if (node != null) {
								nodeDTOWriter.write(node);
								item = generalNodeRepository.findByJamaId(node.getJamaId());
								this.addRelationships(item);
							}
						}
					}
				}

				processedTypes.add(activity.getObjectType());
				if (!processed.containsKey(activity.getItem())) {
					processed.put(activity.getItem(), processedTypes);
				}
			}

			tx.success();
		}

		logger.info("Finished updating database with " + activities.size() + " activities.");
	}

	private void deleteRelationships(GeneralNode item) {
		List<GeneralNode> neighbors = generalNodeRepository.findJamaRelationshipNeighbors(item.getKey());

		for (GeneralNode neighbor : neighbors) {
			neo4jTemplate.deleteRelationshipBetween(item, neighbor, "DOWNSTREAM");
		}
	}

	private void addRelationships(GeneralNode item) {
		List<JamaRelationshipDTO> relationships = restClient.getRelationshipsForItem(item.getJamaId());
		relationshipDTOWriter.write(relationships);
	}
}
