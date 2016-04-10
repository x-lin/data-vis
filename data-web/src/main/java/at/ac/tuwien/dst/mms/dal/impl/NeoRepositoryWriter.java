package at.ac.tuwien.dst.mms.dal.impl;

import at.ac.tuwien.dst.mms.dal.DataWriter;
import at.ac.tuwien.dst.mms.dal.jama.dto.JamaRelationshipDTO;
import at.ac.tuwien.dst.mms.dal.jira.model.JiraIssueDTO;
import at.ac.tuwien.dst.mms.dal.repo.*;
import at.ac.tuwien.dst.mms.model.*;
import org.neo4j.graphdb.Transaction;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.core.GraphDatabase;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * Writes data to the neo4j database.
 */
public class NeoRepositoryWriter implements DataWriter {
	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private GeneralNodeRepository generalNodeRepository;

	@Autowired
	private GeneralNodeTypeRepository generalNodeTypeRepository;

	@Autowired
	private GraphDatabase graphDatabase;

	@Autowired
	private GeneralNodeJamaIndexRepository generalNodeJamaIndexRepository;

	@Autowired
	private TextIndexRepository textIndexRepository;

	@Autowired(required = false)
	private Logger logger;

	@Override
	public void storeIssues(Collection<JiraIssueDTO> issues) {
		try (Transaction tx = graphDatabase.beginTx()) {
			for(JiraIssueDTO issue : issues) {
				if(!issue.getStatus().equals("Closed")) {
					GeneralNode dbIssue = generalNodeRepository.findbyName(issue.getName(), issue.getProject().getKey());
					GeneralNodeType userType = new GeneralNodeType("USER", "User");

					if(dbIssue != null && (dbIssue.getType().getKey().equals("BUG") || dbIssue.getType().getKey().equals("WP") )) {

						dbIssue.setJiraId(issue.getKey());

						if(issue.getUser() != null && issue.getUser().getKey() != null && issue.getUser().getName() != null) {
							GeneralNode user = new GeneralNode(issue.getUser().getKey(), issue.getUser().getName());
							user.setType(userType);
							dbIssue.setJiraStatus(issue.getStatus());

							if(dbIssue.getUnclassified() == null) {
								dbIssue.setUnclassified(new HashSet<>());
							}

							dbIssue.addUnclassified(user);
						} else {
							logger.warn("User assignee for issue " + dbIssue + " was " + issue.getUser());
						}

						generalNodeRepository.save(dbIssue);
					} else {
						logger.warn("Issue not found in Db..." + (dbIssue == null ? "name was " + issue.getName() : "type wrong, was " + dbIssue.getType().getKey() ));

						dbIssue = new GeneralNode(issue.getKey(), issue.getName());

						if(issue.getUser() != null && issue.getUser().getKey() != null && issue.getUser().getName() != null) {
							GeneralNode user = new GeneralNode(issue.getUser().getKey(), issue.getUser().getName());
							user.setType(userType);
							dbIssue.setJiraStatus(issue.getStatus());
							dbIssue.setUnclassified(new HashSet<>());
							dbIssue.addUnclassified(user);
							Project project = projectRepository.findByKey(issue.getProject().getKey());
							dbIssue.setProject(project);
						} else {
							logger.warn("User assignee for issue " + dbIssue + " was " + issue.getUser());
						}
					}
				}
			}
			tx.success();

			logger.info(issues.size() + " issues saved for project " +
					(issues.size() > 0 ? issues.iterator().next().getProject().getKey() : "") + ".");
		}
	}

	@Override
	public void storeProjects(Collection<Project> projects) {
		try (Transaction tx = graphDatabase.beginTx()) {
			projectRepository.save(projects);

			tx.success();

			logger.info(projects.size() + " projects saved.");
		}
	}

	@Override
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

	@Override
	public void storeProject(Project project) {
		projectRepository.save(project);
	}

	@Override
	@Transactional
	public void storeGeneralNodes(List<GeneralNode> nodes) {
		Map<Integer, Project> projects = new HashMap<>();

		Map<Long, GeneralNode> processedNodes = new HashMap<>();
		Map<Long, Set<GeneralNode>> unprocessedChilds = new HashMap<>();

		for(GeneralNode node : nodes) {
			GeneralNode dbNode = generalNodeRepository.findByKey(node.getKey()) != null ?
					generalNodeRepository.findByKey(node.getKey()) : node;

//			System.out.println(dbNode);

			if(generalNodeRepository.findByJamaId(node.getJamaId()) == null) {
				generalNodeJamaIndexRepository.save(new GeneralNodeJamaIndex(node.getJamaId(), dbNode));
			}

//			//add parent, if one exists in processedParents, otherwise save itself to unprocessedChilds
//			if(dbNode.getParent() == null && node.getJamaParentId() != null) {
//				GeneralNode parent = processedNodes.get(node.getJamaParentId());
//
//				if(parent != null) {
//					dbNode.setParent(parent);
//				} else {
//					if(unprocessedChilds.get(node.getJamaParentId()) == null) {
//						unprocessedChilds.put(node.getJamaParentId(), new HashSet<>());
//					}
//
//					unprocessedChilds.get(node.getJamaParentId()).add(dbNode);
//				}
//			}

//			System.out.println(dbNode);


			//process all unprocessed children
//			if(node.getJamaId() != null && unprocessedChilds.get(node.getJamaId()) != null) {
//				unprocessedChilds.get(node.getJamaId()).forEach(dbNode::addChildren);
//				unprocessedChilds.remove(node.getJamaId());
//			}
//			System.out.println(node);
//			System.out.println("project id: " + node.getProjectId());
//			System.out.println("projects: " + projects);
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

	@Override
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

	@Override
	public void addIndex() {
		this.addIndexForProjects();
		logger.info("text index added for projects");
		this.addIndexforGeneralNodes();
		logger.info("text index added for general nodes");
	}

	@Transactional
	private void addIndexforGeneralNodes() {
		List<GeneralNode> nodes = generalNodeRepository.findAll(100000);

		for(GeneralNode node : nodes) {
			if(node.getJiraId() == null) {
				Set<TextIndex> indices = new HashSet<>();
				node.setTextIndex(indices);

				TextIndex indexKey = this.getTextIndex(node.getKey());
				TextIndex indexName = this.getTextIndex(node.getName());

				indices.add(indexKey);
				indices.add(indexName);
			}
		}

		generalNodeRepository.save(nodes);
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
	private void addIndexForProjects(){
		List<Project> projects = projectRepository.findAll(100000);

		for(Project node : projects) {
			Set<TextIndex> indices = new HashSet<>();
			node.setTextIndex(indices);

			TextIndex indexKey = this.getTextIndex(node.getKey());
			TextIndex indexName = this.getTextIndex(node.getName());

			indices.add(indexKey);
			indices.add(indexName);
		}

		projectRepository.save(projects);
	}
}
