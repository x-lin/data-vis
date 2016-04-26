package at.ac.tuwien.dst.mms.dal.jama;

import at.ac.tuwien.dst.mms.dal.DataWriter;
import at.ac.tuwien.dst.mms.dal.jama.dto.JamaRelationshipDTO;
import at.ac.tuwien.dst.mms.dal.repo.GeneralNodeJamaIndexRepository;
import at.ac.tuwien.dst.mms.dal.repo.GeneralNodeRepository;
import at.ac.tuwien.dst.mms.model.GeneralNode;
import org.neo4j.graphdb.Transaction;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.core.GraphDatabase;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by XLin on 25.04.2016.
 */
@Service
public class JamaRelationshipDTOWriter implements DataWriter<JamaRelationshipDTO> {
	@Autowired(required = false)
	private Logger logger;

	@Autowired
	private GeneralNodeJamaIndexRepository generalNodeJamaIndexRepository;

	@Autowired
	private GeneralNodeRepository generalNodeRepository;

	@Autowired
	private GraphDatabase graphDatabase;

	@Override
	public void write(List<JamaRelationshipDTO> relationships) {
		try (Transaction tx = graphDatabase.beginTx()) {
			for (JamaRelationshipDTO relationship : relationships) {
				if (relationship.getFrom() == null || relationship.getTo() == null) {
					//TODO save relationship to storage for later on.
				} else {
					if (generalNodeJamaIndexRepository.findByJamaId(relationship.getFrom()) == null) {
						logger.warn("no node found for id " + relationship.getFrom());
					} else if (generalNodeJamaIndexRepository.findByJamaId(relationship.getTo()) == null) {
						logger.warn("no node found for id " + relationship.getTo());
					} else {
						GeneralNode from = generalNodeJamaIndexRepository.findByJamaId(relationship.getFrom()).getNode();
						GeneralNode to = generalNodeJamaIndexRepository.findByJamaId(relationship.getTo()).getNode();

						if (from != null && to != null) {
							from.addDownstream(to);
							generalNodeRepository.save(from);

						} else if (from == null) {
							logger.warn("upstream object " + relationship.getFrom() + " doesn't exist!");
						} else {
							logger.warn("downstream object " + relationship.getTo() + " doesn't exist!");
						}
					}
				}
			}

			tx.success();
		}

		logger.info(relationships.size() + " relationships stored.");
	}

	@Override
	public void write(JamaRelationshipDTO object) {
		logger.warn("Method not yet implemented");
	}

	@Override
	public void delete(List<JamaRelationshipDTO> objects) {
		for (JamaRelationshipDTO relationship : objects) {
			GeneralNode from = generalNodeRepository.findByJamaId(relationship.getFrom());
			GeneralNode to = generalNodeRepository.findByJamaId(relationship.getTo());

			//TODO find relationships and delete them
		}
	}
}
