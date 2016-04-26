package at.ac.tuwien.dst.mms.dal.jira;

import at.ac.tuwien.dst.mms.model.Project;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Extracts data from the Jira REST API wrapper.
 */
@Service
public class JiraExtractor {
	@Autowired
	JiraRestClient jiraRestClient;

	@Autowired(required = false)
	Logger logger;

	//TODO remove persistent error logging
	public void extractAll() {
		long start = System.nanoTime();

		Project[] projects = jiraRestClient.getProjects();

		for (Project project : projects) {
			this.extractTickets(project.getKey());
		}

		logger.info("Finished requesting all data in " + (System.nanoTime() - start)/1000000000.0 + "s.");
	}

	public void extractTickets(String projectKey) {
		try {
			jiraRestClient.getIssuesWebhook(projectKey);
		} catch (Exception e) {
			logger.error("Exception occurred: ", e);
		}
	}
}
