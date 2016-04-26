package at.ac.tuwien.dst.mms.dal.jira.converters;

import at.ac.tuwien.dst.mms.dal.IndexWriter;
import at.ac.tuwien.dst.mms.dal.DataConverter;
import at.ac.tuwien.dst.mms.dal.jira.dto.JiraIssueDTO;
import at.ac.tuwien.dst.mms.dal.repo.ProjectRepository;
import at.ac.tuwien.dst.mms.model.GeneralNode;
import at.ac.tuwien.dst.mms.model.GeneralNodeType;
import at.ac.tuwien.dst.mms.model.TextIndex;
import org.springframework.beans.factory.annotation.Autowired;
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

	@Override
	public GeneralNode convert(JiraIssueDTO sourceObject) {
		GeneralNode gn = new GeneralNode();

		gn.setJiraId(sourceObject.getKey());
		gn.setJiraStatus(sourceObject.getStatus());

		GeneralNode user = this.createUser(sourceObject);
		gn.setUnclassified(new HashSet<>());
		gn.addUnclassified(user);

		gn.setProject(projectRepository.findByKey(sourceObject.getProject().getKey()));

		Set<TextIndex> indices = this.addIndices(sourceObject);
		gn.setTextIndex(indices);

		return gn;
	}

	private GeneralNode createUser(JiraIssueDTO issue) {
		GeneralNodeType userType = new GeneralNodeType("USER", "User");
		GeneralNode user = new GeneralNode(issue.getUser().getKey(), issue.getUser().getName());
		user.setType(userType);

		return user;
	}

	@Override
	public GeneralNode convert(JiraIssueDTO sourceObject, GeneralNode targetObject) {
		if(targetObject.getName() == null) {
			targetObject.setName(sourceObject.getName());
		}

		targetObject.setJiraId(targetObject.getJiraId());
		targetObject.setJiraStatus(targetObject.getStatus());

		GeneralNode user = this.createUser(sourceObject);
		if(targetObject.getUnclassified() == null) {
			targetObject.setUnclassified(new HashSet<>());
		}
		targetObject.addUnclassified(user);

		Set<TextIndex> indices = this.addIndices(sourceObject);
		targetObject.setTextIndex(indices);

		return targetObject;
	}

	private Set<TextIndex> addIndices(JiraIssueDTO dto) {
		List<String> toIndex = new ArrayList<>();
		toIndex.add(dto.getName());
		toIndex.add(dto.getKey());

		return indexWriter.create(toIndex);
	}
}
