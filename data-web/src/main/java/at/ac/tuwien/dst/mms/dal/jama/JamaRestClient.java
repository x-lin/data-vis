package at.ac.tuwien.dst.mms.dal.jama;

import at.ac.tuwien.dst.mms.dal.jama.dto.JamaRelationshipDTO;
import at.ac.tuwien.dst.mms.model.GeneralNode;
import at.ac.tuwien.dst.mms.model.Project;
import at.ac.tuwien.dst.mms.util.Config;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Service
public class JamaRestClient {

	@Autowired
	private RestTemplate restTemplate;

	@Autowired(required=false)
	Logger logger;

	private String projectsUri = Config.JAMA_EXTRACTOR_HOST + "/projects";

	private String itemsUri = Config.JAMA_EXTRACTOR_HOST + "/items";

	private String relationshipsUri = Config.JAMA_EXTRACTOR_HOST + "/relationships";

//	private String issuesUri = Config.JIRA_WRAPPER_HOST + "/issues";
//
//	private String issueUri = Config.JIRA_WRAPPER_HOST + "/issue";

	public Project[] getProjects() {
		logger.info("Fetching all projects on uri "+projectsUri + ".");

		Project[] projects = restTemplate.getForEntity(URI.create(projectsUri), Project[].class).getBody();

		return projects;
	}

	@Async
	public GeneralNode[] getItems(Integer id) {
		URI uri = UriComponentsBuilder
				.fromHttpUrl(itemsUri)
				.queryParam("project", id)
				.queryParam("webhook", Config.JAMA_WEBHOOK_ITEMS)
				.build().encode().toUri();

		logger.info("Requesting all items for project " + id);

		return restTemplate.getForEntity(uri, GeneralNode[].class).getBody();
	}

	@Async
	public void getRelationships(Integer id) {
		URI uri = UriComponentsBuilder
				.fromHttpUrl(relationshipsUri)
				.queryParam("project", id)
				.queryParam("webhook", Config.JAMA_WEBHOOK_RELATIONSHIPS)
				.build().encode().toUri();

		logger.info("Requesting all relationships for project " + id);

		restTemplate.getForEntity(uri, JamaRelationshipDTO[].class).getBody();
	}

//	public Issue[] getIssues(String projectKey) {
//		logger.info("Requesting issues for project " + projectKey + ". For larger projects, it is advisable to use " +
//				"the webhook mode");
//
//		return restTemplate.getForEntity(URI.create(issuesUri), Issue[].class).getBody();
//	}
//
//	@Async
//	public void getIssuesWebhook(String projectKey) {
//		URI uri = UriComponentsBuilder
//				.fromHttpUrl(issuesUri)
//				.queryParam("projectKey", '"' + projectKey + '"')
//				.queryParam("webhook", Config.JIRA_WEBHOOK_ISSUES)
//				.build().encode().toUri();
//
//		logger.info("Requesting issues for project " + projectKey + " with URI " + uri + ". Results will be directed " +
//				"to specified webhook.");
//
//		restTemplate.getForObject(uri, List.class);
//	}
//
//	public Issue getIssue(String key) {
//		return restTemplate.getForObject(URI.create(issueUri+"/"+key), Issue.class);
//	}
}