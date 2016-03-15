package at.ac.tuwien.dst.mms.dal.jira;

import at.ac.tuwien.dst.mms.dal.DataWriter;
import at.ac.tuwien.dst.mms.model.Issue;
import at.ac.tuwien.dst.mms.model.Project;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.List;

/**
 * Webhook for listening on JIRA data and directing the data for storage.
 */
@RestController
@RequestMapping("/jira/webhook")
public class JiraWebhook {
	@Autowired
	DataWriter neoWriter;

	@Autowired(required=false)
	Logger logger;

	@RequestMapping(path="/projects", method=RequestMethod.POST)
	public void projects(
			@RequestBody List<Project> projects) {
		neoWriter.storeProjects(projects);
	}

	@RequestMapping(path="/issues", method=RequestMethod.POST)
	public void issues(
			@RequestBody List<Issue> issues) {

		try (Writer output = new BufferedWriter(new FileWriter("target/errors1.log"))) {
			try {
				//NOTE: Users don't need to be stored separately as saving an issue will store the corresponding
				//user automatically
				neoWriter.storeIssues(issues);
			} catch (Exception e) {
				logger.error("Exception occurred: ", e);
				output.append(e.getMessage());
			}
		} catch(IOException e) {
			e.printStackTrace();
		}



	}
}
