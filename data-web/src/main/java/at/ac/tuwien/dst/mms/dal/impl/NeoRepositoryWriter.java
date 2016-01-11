package at.ac.tuwien.dst.mms.dal.impl;

import at.ac.tuwien.dst.mms.dal.DataWriter;
import at.ac.tuwien.dst.mms.dal.repo.IssueRepository;
import at.ac.tuwien.dst.mms.dal.repo.ProjectRepository;
import at.ac.tuwien.dst.mms.dal.repo.RequirementRepository;
import org.neo4j.graphdb.Transaction;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import at.ac.tuwien.dst.mms.dal.model.Issue;
import at.ac.tuwien.dst.mms.dal.model.Project;
import at.ac.tuwien.dst.mms.dal.model.Requirement;
import org.springframework.data.neo4j.core.GraphDatabase;

import java.util.Collection;

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
	GraphDatabase graphDatabase;

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
	public void storeProjects(Project[] projects) {
		try (Transaction tx = graphDatabase.beginTx()) {
			for(int i = 0; i < projects.length; i++) {
				projectRepository.save(projects[i]);
			}

			tx.success();

			logger.info(projects.length + " projects saved.");
		}
	}

	@Override
	public void storeProject(Project project) {
		projectRepository.save(project);
	}

	@Override
	public void storeRequirements(Collection<Requirement> requirements) {
		requirementRepository.save(requirements);
	}

	@Override
	public void storeRequirement(Requirement requirement) {
		requirementRepository.save(requirement);
	}
}
