package at.ac.tuwien.dst.mms.dal.impl;

import at.ac.tuwien.dst.mms.dal.DataWriter;
import at.ac.tuwien.dst.mms.dal.jama.dto.JamaRelationshipDTO;
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
	private IssueRepository issueRepository;

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private RequirementRepository requirementRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private GeneralNodeRepository generalNodeRepository;

	@Autowired
	private GeneralNodeTypeRepository generalNodeTypeRepository;

	@Autowired
	private GraphDatabase graphDatabase;

	@Autowired
	private GeneralNodeJamaIndexRepository generalNodeJamaIndexRepository;

	@Autowired(required = false)
	private Logger logger;

	@Override
	public void storeIssues(Collection<Issue> issues) {
		try (Transaction tx = graphDatabase.beginTx()) {
			issueRepository.save(issues);
			tx.success();

			logger.info(issues.size() + " issues saved for project " +
					(issues.size() > 0 ? issues.iterator().next().getProject().getKey() : "") + ".");
		}
	}

	@Override
	public void storeIssue(Issue issue) {
		try(Transaction tx = graphDatabase.beginTx()) {
			issueRepository.save(issue);

			tx.success();

			logger.info("Issue with key " + issue.getKey() + " saved.");
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
	public void storeRequirements(Collection<Requirement> requirements) {
		try (Transaction tx = graphDatabase.beginTx()) {
			requirementRepository.save(requirements);

			tx.success();

			logger.info(requirements.size() + " requirements saved.");
		}

	}

	@Override
	public void storeRequirement(Requirement requirement) {
		requirementRepository.save(requirement);
	}

	@Override
	public void storeUser(User user) {
		userRepository.save(user);
	}

	@Override
	public void storeUsers(User[] users) {
		Set<String> processed = new HashSet<>();

		for (User user : users) {
			if (!processed.contains(user.getName())) {
				try (Transaction tx = graphDatabase.beginTx()) {
					userRepository.save(user);
					tx.success();
					processed.add(user.getName());
				}
			}
		}

		logger.info(processed + " users saved.");
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
}
