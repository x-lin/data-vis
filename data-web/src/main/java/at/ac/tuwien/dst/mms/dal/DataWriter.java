package at.ac.tuwien.dst.mms.dal;

import at.ac.tuwien.dst.mms.dal.jama.dto.JamaRelationshipDTO;
import at.ac.tuwien.dst.mms.dal.jira.model.JiraIssueDTO;
import at.ac.tuwien.dst.mms.model.*;

import java.util.Collection;
import java.util.List;

public interface DataWriter {

	void storeIssues(Collection<JiraIssueDTO> issues);

	void storeProjects(Collection<Project> projects);

	void storeProjects(Project[] projects);

	void storeProject(Project project);

	void storeGeneralNodes(List<GeneralNode> nodes);

	void addRelationships(List<JamaRelationshipDTO> relationships);

	void addIndex();
}