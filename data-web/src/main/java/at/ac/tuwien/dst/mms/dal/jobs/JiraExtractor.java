package at.ac.tuwien.dst.mms.dal.jobs;

import at.ac.tuwien.dst.mms.dal.DataWriter;
import at.ac.tuwien.dst.mms.dal.extract.rest.JiraRestClient;
import at.ac.tuwien.dst.mms.model.Project;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;

/**
 * Extracts data from the Jira REST API wrapper.
 */
@Service
public class JiraExtractor {
	@Autowired
	JiraRestClient jiraRestClient;

	@Autowired
	DataWriter neoWriter;

	@Autowired(required = false)
	Logger logger;

	//TODO remove persistent error logging
	public void extractAll() {
		try (Writer output = new BufferedWriter(new FileWriter("target/errors.log"))) {

			long start = System.nanoTime();

			Project[] projects = jiraRestClient.getProjects();
			neoWriter.storeProjects(projects);

			for (Project project : projects) {
				try {
					jiraRestClient.getIssuesWebhook(project.getKey());
				} catch (Exception e) {
					logger.error("Exception occurred: ", e);
					output.append(project.getKey());
				}
			}

			logger.info("Finished requesting all data in " + (System.nanoTime() - start)/1000000000.0 + "s.");
		} catch(IOException e) {
			e.printStackTrace();
		}


	}
}
