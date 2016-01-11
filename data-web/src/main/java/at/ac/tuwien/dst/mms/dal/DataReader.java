package at.ac.tuwien.dst.mms.dal;

import at.ac.tuwien.dst.mms.dal.model.Issue;
import at.ac.tuwien.dst.mms.dal.model.Project;

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

	Integer countIssues(String projectKey);
}
