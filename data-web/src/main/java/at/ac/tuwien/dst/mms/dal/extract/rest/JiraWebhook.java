package at.ac.tuwien.dst.mms.dal.extract.rest;

import at.ac.tuwien.dst.mms.dal.impl.NeoRepositoryWriter;
import at.ac.tuwien.dst.mms.dal.model.Issue;
import at.ac.tuwien.dst.mms.dal.model.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Webhook for listening on JIRA data and directing the data for storage.
 */
@RestController
@RequestMapping("/jira/webhook")
public class JiraWebhook {
	@Autowired
	NeoRepositoryWriter neoWriter;

	@RequestMapping(path="/projects", method=RequestMethod.POST)
	public void projects(
			@RequestBody List<Project> projects) {
		neoWriter.storeProjects(projects);
	}

	@RequestMapping(path="/issues", method=RequestMethod.POST)
	public void issues(
			@RequestBody List<Issue> issues) {
		neoWriter.storeIssues(issues);
	}
}
