package at.ac.tuwien.dst.mms.client.rest;

import at.ac.tuwien.dst.mms.dal.DataReader;
import at.ac.tuwien.dst.mms.dal.model.Issue;
import at.ac.tuwien.dst.mms.dal.model.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by xlin on 09.01.2016.
 */
@RestController
@RequestMapping("/search")
public class SearchController {
	@Autowired
	DataReader reader;

	@RequestMapping(value = "/projects/{string}", method= RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Project findProjects(
			@PathVariable String string) {
		return reader.getProject(string);
	}

	@RequestMapping(value = "/issues/{projectKey}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Issue> getIssuesForProject(
			@PathVariable String projectKey) {
		return reader.getIssues(reader.getProject(projectKey));
	}

	@RequestMapping(value = "/issues/like/{string}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Issue> getIssuesStartingWith(
			@PathVariable String string) {
		return reader.getIssuesStartingWith(string);
	}

	@RequestMapping(value = "/projects", method= RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Iterable<Project> getAllProjects() {
		return reader.getAllProjects();
	}

	@RequestMapping(value ="/issues/count/{projectKey}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public int countNrIssues(
			@PathVariable String projectKey) {
		return reader.countIssues(projectKey);
	}

	@RequestMapping(value ="/issue/{key}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Issue getIssue(
			@PathVariable String key) {
		return reader.getIssue(key);
	}

}
