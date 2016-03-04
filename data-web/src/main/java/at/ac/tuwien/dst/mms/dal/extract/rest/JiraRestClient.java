package at.ac.tuwien.dst.mms.dal.extract.rest;

import at.ac.tuwien.dst.mms.model.Issue;
import at.ac.tuwien.dst.mms.model.Project;
import at.ac.tuwien.dst.mms.util.Config;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

/**
 * Implements a simple client for sending requests to the JIRA REST Wrapper Service.
 */
@Service
public class JiraRestClient {

	@Autowired
	private RestTemplate restTemplate;

	@Autowired(required=false)
	Logger logger;

	private String projectsUri = Config.JIRA_WRAPPER_HOST + "/projects";

	private String issuesUri = Config.JIRA_WRAPPER_HOST + "/issues";

	private String issueUri = Config.JIRA_WRAPPER_HOST + "/issue";

	public Project[] getProjects() {
		logger.info("Fetching all projects on uri "+projectsUri + ".");

		Project[] projects = restTemplate.getForEntity(URI.create(projectsUri), Project[].class).getBody();

		return projects;
	}

	@Async
	public void getProjectsWebhook() {
		URI uri = UriComponentsBuilder
				.fromHttpUrl(projectsUri)
				.queryParam("webhook", Config.JIRA_WEBHOOK_PROJECTS)
				.build().encode().toUri();

		logger.info("Requesting all projects. Results will be directed to specified webhook.");

		restTemplate.getForObject(uri, List.class);
	}

	public Issue[] getIssues(String projectKey) {
		logger.info("Requesting issues for project " + projectKey + ". For larger projects, it is advisable to use " +
				"the webhook mode");

		return restTemplate.getForEntity(URI.create(issuesUri), Issue[].class).getBody();
	}

	@Async
	public void getIssuesWebhook(String projectKey) {
		URI uri = UriComponentsBuilder
				.fromHttpUrl(issuesUri)
				.queryParam("projectKey", '"' + projectKey + '"')
				.queryParam("webhook", Config.JIRA_WEBHOOK_ISSUES)
				.build().encode().toUri();

		logger.info("Requesting issues for project " + projectKey + " with URI " + uri + ". Results will be directed " +
				"to specified webhook.");

		restTemplate.getForObject(uri, List.class);
}

	public Issue getIssue(String key) {
		return restTemplate.getForObject(URI.create(issueUri+"/"+key), Issue.class);
	}
}