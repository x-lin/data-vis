package at.ac.tuwien.dst.mms.dal;

import at.ac.tuwien.dst.mms.model.Issue;
import at.ac.tuwien.dst.mms.model.Project;

import java.util.List;

/**
 * Created by xlin on 10.01.2016.
 */
public interface DataReader {
	List<Issue> getIssues(String projectKey);

	List<Issue> getIssues(Project project);

	Issue getIssue(String key);

	List<Project> getAllProjects();

	Project getProject(String key);

	List<Project> getProjectsStartingWith(String string);

	Integer countIssues(String projectKey);

	List<Issue> getIssuesStartingWith(String string);
}
