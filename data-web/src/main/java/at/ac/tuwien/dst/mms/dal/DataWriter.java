package at.ac.tuwien.dst.mms.dal;

import at.ac.tuwien.dst.mms.dal.jama.dto.JamaRelationshipDTO;
import at.ac.tuwien.dst.mms.model.*;

import java.util.Collection;
import java.util.List;

public interface DataWriter {

	void storeIssues(Collection<Issue> issues);

	void storeIssue(Issue issue);

	void storeProjects(Collection<Project> projects);

	void storeProjects(Project[] projects);

	void storeProject(Project project);

	void storeRequirements(Collection<Requirement> requirements);

	void storeRequirement(Requirement requirement);

	void storeUser(User user);

	void storeUsers(User[] users);

	void storeGeneralNodes(List<GeneralNode> nodes);

	void addRelationships(List<JamaRelationshipDTO> relationships);
}