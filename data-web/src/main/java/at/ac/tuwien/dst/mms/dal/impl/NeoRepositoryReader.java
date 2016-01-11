package at.ac.tuwien.dst.mms.dal.impl;

import at.ac.tuwien.dst.mms.dal.DataReader;
import at.ac.tuwien.dst.mms.dal.model.Issue;
import at.ac.tuwien.dst.mms.dal.model.Project;
import at.ac.tuwien.dst.mms.dal.repo.IssueRepository;
import at.ac.tuwien.dst.mms.dal.repo.ProjectRepository;
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
		long start = System.nanoTime();
		System.out.println(issueRepository.findByProjectKey("MNG").size());
		System.out.println((System.nanoTime()-start)/1000000.0);
		start = System.nanoTime();
		System.out.println(issueRepository.countByProject("MNG"));
		System.out.println((System.nanoTime()-start)/1000000.0);

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
		return issueRepository.findByProjectKeyLimit(projectKey);
	}

	@Override
	public List<Issue> getIssues(Project project) {
		return issueRepository.findByProjectKeyLimit(project.getKey());
	}

	@Override
	public Issue getIssue(String key) {
		return issueRepository.findByKey(key);
	}
}
