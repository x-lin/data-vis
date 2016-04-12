package at.ac.tuwien.dst.mms.dal.jama;

import at.ac.tuwien.dst.mms.dal.jama.dto.JamaRelationshipDTO;
import at.ac.tuwien.dst.mms.dal.repo.*;
import at.ac.tuwien.dst.mms.model.GeneralNode;
import at.ac.tuwien.dst.mms.model.GeneralNodeJamaIndex;
import at.ac.tuwien.dst.mms.model.Project;
import at.ac.tuwien.dst.mms.model.TextIndex;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * Created by XLin on 10.03.2016.
 */
@Service
public class JamaDataWriter {
	@Autowired
	private GeneralNodeRepository generalNodeRepository;

	@Autowired
	private GeneralNodeTypeRepository generalNodeTypeRepository;

	@Autowired
	private GeneralNodeJamaIndexRepository generalNodeJamaIndexRepository;

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private TextIndexRepository textIndexRepository;

	@Autowired(required = false)
	private Logger logger;

	@Transactional
	public void storeGeneralNodes(List<GeneralNode> nodes) {
		Map<Integer, Project> projects = new HashMap<>();

		Map<Long, GeneralNode> processedNodes = new HashMap<>();
		Map<Long, Set<GeneralNode>> unprocessedChilds = new HashMap<>();

		for(GeneralNode node : nodes) {
			GeneralNode dbNode = generalNodeRepository.findByKey(node.getKey()) != null ?
					generalNodeRepository.findByKey(node.getKey()) : node;

			if(generalNodeRepository.findByJamaId(node.getJamaId()) == null) {
				generalNodeJamaIndexRepository.save(new GeneralNodeJamaIndex(node.getJamaId(), dbNode));
			}

			//add parent, if one exists in processedParents, otherwise save itself to unprocessedChilds
			if(dbNode.getParent() == null && node.getJamaParentId() != null) {
				GeneralNode parent = processedNodes.get(node.getJamaParentId());

				if(parent != null) {
					dbNode.setParent(parent);
				} else {
					if(unprocessedChilds.get(node.getJamaParentId()) == null) {
						unprocessedChilds.put(node.getJamaParentId(), new HashSet<>());
					}

					unprocessedChilds.get(node.getJamaParentId()).add(dbNode);
				}
			}

			//process all unprocessed children
			if(node.getJamaId() != null && unprocessedChilds.get(node.getJamaId()) != null) {
				unprocessedChilds.get(node.getJamaId()).forEach(dbNode::addChildren);
				unprocessedChilds.remove(node.getJamaId());
			}

			if(!projects.containsKey(node.getProjectId())) {
				projects.put(node.getProjectId(), projectRepository.findByJamaId(node.getProjectId()));
			}

			Project project = projects.get(node.getProjectId());

			if(node.getProjectId() != null && project != null)  {
				node.setProject(project);
				generalNodeRepository.save(node);
			} else {
				logger.warn("No project information found for general node.");
			}

			processedNodes.put(node.getJamaId(), dbNode);
		}

		if(unprocessedChilds.size() > 0) {
			String log = unprocessedChilds.size() + " parents unprocessed with childs: ";

			for(Map.Entry<Long, Set<GeneralNode>> map : unprocessedChilds.entrySet()) {
				log += map.getKey() + "-" + map.getValue() + "; ";
			}

			logger.warn(log);
		}

		logger.info(nodes.size() + " general nodes processed.");
	}

	@Transactional
	public void addRelationships(List<JamaRelationshipDTO> relationships) {
		for(JamaRelationshipDTO relationship : relationships) {
			if(relationship.getFrom() == null) {
				logger.warn("no from end found!");
			} else {
				if(generalNodeJamaIndexRepository.findByJamaId(relationship.getFrom()) == null) {
					logger.warn("no node found for id " + relationship.getFrom());
				} else if(generalNodeJamaIndexRepository.findByJamaId(relationship.getTo()) == null) {
					logger.warn("no node found for id " + relationship.getTo());
				} else {
					GeneralNode from = generalNodeJamaIndexRepository.findByJamaId(relationship.getFrom()).getNode();
					GeneralNode to = generalNodeJamaIndexRepository.findByJamaId(relationship.getTo()).getNode();

					if(from != null && to != null) {
						from.addDownstream(to);
						generalNodeRepository.save(from);

					} else if(from == null) {
						logger.warn("upstream object " + relationship.getFrom() + " doesn't exist!");
					} else {
						logger.warn("downstream object " + relationship.getTo() + " doesn't exist!");
					}
				}
			}
		}
	}

	@Transactional
	public void storeProjects(Collection<Project> projects) {
		for(Project project : projects) {
			project.setTextIndex(this.createIndices(project));
		}

		projectRepository.save(projects);
	}

	private Set<TextIndex> createIndices(Project project) {
		Set<TextIndex> indices = new HashSet<>();

		TextIndex indexKey = this.getTextIndex(project.getKey());
		TextIndex indexName = this.getTextIndex(project.getName());

		indices.add(indexKey);
		indices.add(indexName);

		return indices;
	}

	private TextIndex getTextIndex(String key) {
		TextIndex indexKey = textIndexRepository.findByKey(key);

		if(indexKey == null) {
			indexKey = new TextIndex(key);
			textIndexRepository.save(indexKey);
		}

		return indexKey;
	}

	@Transactional
	public void storeProjects(Project[] projects) {
		for(Project project : projects) {

			Project dbProject = projectRepository.findByKey(project.getKey()) != null ?
					projectRepository.findByKey(project.getKey()) : project;

			if(project.getJamaId() != null) {
				dbProject.setJamaId(project.getJamaId());
			}

			if(project.getJamaParentId() != null) {
				dbProject.setJamaParentId(project.getJamaParentId());
			}

			if(project.getName() != null && dbProject.getName() == null) {
				dbProject.setName(project.getName());
			}

			projectRepository.save(dbProject);
		}
		logger.info(projects.length + " projects saved.");
	}

	public void storeProject(Project project) {
		projectRepository.save(project);
	}
}
