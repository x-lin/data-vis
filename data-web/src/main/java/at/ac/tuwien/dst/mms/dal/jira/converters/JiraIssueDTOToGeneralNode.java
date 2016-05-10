package at.ac.tuwien.dst.mms.dal.jira.converters;

import at.ac.tuwien.dst.mms.dal.DataConverter;
import at.ac.tuwien.dst.mms.dal.IndexWriter;
import at.ac.tuwien.dst.mms.dal.jira.dto.JiraIssueDTO;
import at.ac.tuwien.dst.mms.dal.repo.GeneralNodeRepository;
import at.ac.tuwien.dst.mms.dal.repo.GeneralNodeTypeRepository;
import at.ac.tuwien.dst.mms.dal.repo.ProjectRepository;
import at.ac.tuwien.dst.mms.model.GeneralNode;
import at.ac.tuwien.dst.mms.model.GeneralNodeType;
import at.ac.tuwien.dst.mms.model.TextIndex;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by XLin on 25.04.2016.
 */
@Service
public class JiraIssueDTOToGeneralNode implements DataConverter<JiraIssueDTO, GeneralNode> {
	@Autowired
	IndexWriter indexWriter;

	@Autowired
	ProjectRepository projectRepository;

	@Autowired
	GeneralNodeTypeRepository generalNodeTypeRepository;

	@Autowired
	GeneralNodeRepository generalNodeRepository;

	@Autowired
	Neo4jTemplate neo4jTemplate;

	@Override
	public GeneralNode convert(JiraIssueDTO sourceObject) {
		GeneralNode gn = new GeneralNode();

		gn.setJiraId(sourceObject.getKey());
		gn.setJiraStatus(sourceObject.getStatus());
		gn.setKey(sourceObject.getKey());
		gn.setName(sourceObject.getName());

		if(sourceObject.getUser() != null) {
			GeneralNode user = this.createUser(sourceObject);
			gn.setUnclassified(new HashSet<>());
			gn.addUnclassified(user);
		}

		gn.setProject(projectRepository.findByKey(sourceObject.getProject().getKey()));

		gn.setType(this.getType(sourceObject));

		Set<TextIndex> indices = this.addIndices(gn);
		gn.setTextIndex(indices);

		return gn;
	}

	private GeneralNodeType getType(JiraIssueDTO issue) {
		GeneralNodeType nodeType;

		if (issue.getName().startsWith("[WP]")) {
			nodeType = generalNodeTypeRepository.findByKey("WP");

			if (nodeType == null) {
				nodeType = new GeneralNodeType();
				nodeType.setKey("WP");
				nodeType.setName("Work Package");
			}
		} else {
			nodeType = generalNodeTypeRepository.findByKey("BUG");

			if (nodeType == null) {
				nodeType = new GeneralNodeType();
				nodeType.setKey("BUG");
				nodeType.setName("Defect");
			}
		}

		return nodeType;
	}

	private GeneralNode createUser(JiraIssueDTO issue) {
		GeneralNodeType userType = new GeneralNodeType("USER", "User");

		if(issue.getUser() != null) {
			GeneralNode user = new GeneralNode(issue.getUser().getKey(), issue.getUser().getName());
			user.setType(userType);

			Set<TextIndex> indices = this.addIndices(user);
			user.setTextIndex(indices);

			return user;
		} else {
			return null;
		}
	}

	@Override
	public GeneralNode convert(JiraIssueDTO sourceObject, GeneralNode targetObject) {
		if(targetObject.getName() == null) {
			targetObject.setName(sourceObject.getName());
		}

		targetObject.setJiraId(sourceObject.getKey());
		targetObject.setJiraStatus(sourceObject.getStatus());

		if (sourceObject.getUser() != null) {
			List<GeneralNode> users = generalNodeRepository.findNeighborUsers(targetObject.getKey());
			for(GeneralNode user : users) {
				neo4jTemplate.deleteRelationshipBetween(targetObject, user, "UNCLASSIFIED");
			}

			GeneralNode user = this.createUser(sourceObject);
			targetObject.setUnclassified(new HashSet<>());
			targetObject.addUnclassified(user);
		} else {
			sourceObject.setUser(null);
		}

		Set<TextIndex> indices = this.addIndices(targetObject);
		targetObject.setTextIndex(indices);

		return targetObject;
	}

	private Set<TextIndex> addIndices(GeneralNode node) {
		List<String> toIndex = new ArrayList<>();
		toIndex.add(node.getName());
		toIndex.add(node.getKey());

		return indexWriter.create(toIndex);
	}
}
