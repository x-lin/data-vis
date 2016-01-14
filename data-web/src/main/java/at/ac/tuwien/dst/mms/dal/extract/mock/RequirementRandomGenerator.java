package at.ac.tuwien.dst.mms.dal.extract.mock;

import at.ac.tuwien.dst.mms.dal.DataReader;
import at.ac.tuwien.dst.mms.dal.DataWriter;
import at.ac.tuwien.dst.mms.dal.repo.IssueRepository;
import at.ac.tuwien.dst.mms.dal.repo.RequirementRepository;
import at.ac.tuwien.dst.mms.model.Issue;
import at.ac.tuwien.dst.mms.model.Project;
import at.ac.tuwien.dst.mms.model.Requirement;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Create a bunch of random requirements.
 */
@Service
public class RequirementRandomGenerator {
	@Autowired
	RequirementRepository requirementRepository;

	@Autowired
	DataWriter writer;

	@Autowired
	DataReader reader;

	@Autowired
	IssueRepository issueRepository;

	@Autowired(required = false)
	Logger logger;

	private String[] keys = {"REQ", "ANOT", "PRO", "ZERT", "HADD", "ZOTT", "LOR", "HOTI", "KITE", "TOI"};

	public void generateAll() {
		for(String key : keys) {
			Set<Requirement> reqs = new HashSet<>();

			for(int i = 1; i <= 1000; i++) {
				Requirement req = new Requirement();
				req.setKey(key+ "-" + i);

				reqs.add(req);
			}

			writer.storeRequirements(reqs);
		}


	}

	public Set<Requirement> generateRequirements() {
		//generate atleast one requirement to at most 4;
		int nr = (int)(Math.random()*4);

		Set<Requirement> reqs = new HashSet<Requirement>();

		for(int i=0; i<=nr; i++) {
			int val = ((int)(Math.random()*999));
			int ind = (int)(Math.random()*9);

			String key = keys[ind] + "-" + val;

			Requirement req = requirementRepository.findByKey(key);

			if(req == null) {
				req = new Requirement();
				req.setKey(key);
			}


			reqs.add(req);

		}

		return reqs;
	}

	@Async
	public void generate(Project project) {
		List<Issue> issues = issueRepository.findByProjectKey(project.getKey());
		logger.info("Found " + issues.size() + " issues for project " + project.getKey());

		//keep track of changed issues, so we don't have to save all issues
		List<Issue> changed = new ArrayList<>();

		for(Issue issue : issues) {
			if(issue.getRequirements() == null || issue.getRequirements().size() == 0) {
				issue.setRequirements(this.generateRequirements());
				changed.add(issue);
			}
		}

		if(changed.size() > 0) {
			writer.storeIssues(changed);
		}
	}
}
