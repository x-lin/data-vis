package at.ac.tuwien.dst.mms.client.rest.impl;

import at.ac.tuwien.dst.mms.model.Issue;
import at.ac.tuwien.dst.mms.util.Config;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by xlin on 15.01.2016.
 */
@RestController
@RequestMapping(Config.SEARCH_REST_PATH + Config.ISSUES_PATH)
public class SearchIssuesController extends AbstractSearchController<Issue> {
//	@RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
//	public List<Issue> getIssuesForProject(
//			@RequestParam String projectKey) {
//		return this.getRepositoryReader().findMatchingByNeighborKey("project", projectKey);
//	}

	@RequestMapping(value ="/count/{projectKey}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public int countNrIssues(
			@PathVariable String projectKey) {
		return 0;
//		return reader.count()countIssues(projectKey);
	}
}
