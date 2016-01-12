package at.ac.tuwien.dst.mms.dal;

import at.ac.tuwien.dst.mms.dal.model.Issue;
import at.ac.tuwien.dst.mms.dal.model.Project;
import at.ac.tuwien.dst.mms.dal.model.Requirement;

import java.util.Collection;

public interface DataWriter {

	void storeIssues(Collection<Issue> issues);

	void storeIssue(Issue issue);

	void storeProjects(Collection<Project> projects);

	void storeProjects(Project[] projects);

	void storeProject(Project project);

	void storeRequirements(Collection<Requirement> requirements);

	void storeRequirement(Requirement requirement);
}