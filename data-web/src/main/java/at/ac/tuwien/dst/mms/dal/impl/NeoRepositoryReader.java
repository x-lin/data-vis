package at.ac.tuwien.dst.mms.dal.impl;

import at.ac.tuwien.dst.mms.dal.DataReader;
import at.ac.tuwien.dst.mms.model.Issue;
import at.ac.tuwien.dst.mms.model.Project;
import at.ac.tuwien.dst.mms.dal.repo.IssueRepository;
import at.ac.tuwien.dst.mms.dal.repo.ProjectRepository;
import at.ac.tuwien.dst.mms.dal.util.CypherWrapper;
import at.ac.tuwien.dst.mms.util.Config;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Reads data from the various Neo4j repositories.
 */
public class NeoRepositoryReader implements DataReader {

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private IssueRepository issueRepository;

	@Override
	@Transactional
	public List<Project> getAllProjects() {
		return projectRepository.findAll().as(List.class);
	}

	@Override
	public Project getProject(String key) {
		return projectRepository.findByKey(key);
	}

	@Override
	public Integer countIssues(String projectKey) {
		return issueRepository.countByProject(projectKey);
	}

	@Override
	public List<Issue> getIssues(String projectKey) {
		return issueRepository.findByProjectKeyLimit(projectKey, Config.REPO_LIMIT);
	}

	@Override
	public List<Issue> getIssues(Project project) {
		return issueRepository.findByProjectKeyLimit(project.getKey(), Config.REPO_LIMIT);
	}

	@Override
	public Issue getIssue(String key) {
		return issueRepository.findByKey(key);
	}

	@Override
	public List<Issue> getIssuesStartingWith(String string) {
		System.out.println(CypherWrapper.wrapLike(string));
		List<Issue> issues = issueRepository.findByLikeKey(CypherWrapper.wrapLike(string), Config.SEARCH_LIMIT);
		System.out.println("issues: "+ (issues == null ? null : issues.size()));
		return issueRepository.findByLikeKey(CypherWrapper.wrapLike(string), Config.SEARCH_LIMIT);
	}

	@Override
	public List<Project> getProjectsStartingWith(String string) {
		System.out.println(CypherWrapper.wrapLike(string));
		List<Project> projects = projectRepository.findByLikeKey(CypherWrapper.wrapLike(string), Config.SEARCH_LIMIT);
		System.out.println("projects: "+ (projects == null ? null : projects.size()));
		return projectRepository.findByLikeKey(CypherWrapper.wrapLike(string), Config.SEARCH_LIMIT);
	}
}
