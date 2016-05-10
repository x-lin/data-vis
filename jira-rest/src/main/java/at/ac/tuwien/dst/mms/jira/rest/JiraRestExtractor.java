package at.ac.tuwien.dst.mms.jira.rest;

import at.ac.tuwien.dst.mms.jira.util.Config;
import com.atlassian.jira.rest.client.api.AuthenticationHandler;
import com.atlassian.jira.rest.client.api.JiraRestClient;
import com.atlassian.jira.rest.client.api.domain.BasicProject;
import com.atlassian.jira.rest.client.api.domain.Issue;
import com.atlassian.jira.rest.client.api.domain.SearchResult;
import com.atlassian.jira.rest.client.auth.AnonymousAuthenticationHandler;
import com.atlassian.jira.rest.client.auth.BasicHttpAuthenticationHandler;
import com.atlassian.jira.rest.client.internal.async.AsynchronousJiraRestClientFactory;
import com.atlassian.util.concurrent.Promise;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URI;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ExecutionException;

/**
 * Extracts data from the JIRA REST API.
 */
public class JiraRestExtractor {
	private Logger logger = LoggerFactory.getLogger(this.getClass());

	private JiraRestClient restClient;

	public JiraRestExtractor() {
		AsynchronousJiraRestClientFactory factory = new AsynchronousJiraRestClientFactory();
		AuthenticationHandler authHandler = this.createAuthHandler();

		restClient = factory.create(URI.create(Config.JIRA_URI), authHandler);

		logger.info("rest client created");
	}

	/**
	 * Creates the authentication handler for a concrete user, if one is specified. Note, that for SSL-encrypted
	 * websites, there may be an issue with the certification path not recognized. To resolve this issue, you may
	 * follow the instructions from the JIRA support page:
	 * https://confluence.atlassian.com/jira/connecting-to-ssl-services-117455.html
	 *
	 * @return the appropriate authentication handler
     */
	private AuthenticationHandler createAuthHandler() {
		if(Config.USERNAME != null && Config.USERNAME.length() > 0) {
			return new BasicHttpAuthenticationHandler(Config.USERNAME, Config.PASSWORD);
		} else {
			return new AnonymousAuthenticationHandler();
		}
	}

	public Iterable<BasicProject> getProjects() throws ExecutionException, InterruptedException {
		Promise<Iterable<BasicProject>> projects = restClient.getProjectClient().getAllProjects();

		return projects.get();
	}

	public SearchResult getIssues(String projectKey, String updated) throws ExecutionException, InterruptedException {
		return this.getIssues(projectKey, 0, updated);
	}

	public SearchResult getIssues(String projectKey, int startAt, String updated) throws ExecutionException, InterruptedException {
		//result size of -1 means, the JIRA REST API will return the maximum batch size allowed.
		return this.getIssues(projectKey, startAt, -1, updated);
	}

	public SearchResult getIssues(String projectKey, int startAt, int resultsSize, String updated) throws ExecutionException, InterruptedException {
		String jqlQuery = "project="+projectKey;

		if (updated != null) {
			jqlQuery += " AND updated > -" + updated;
		}

		Set<String> fields = new HashSet<>(Arrays.asList("summary", "issuetype", "created", "updated", "project", "status", "reporter", "assignee"));
		Promise<SearchResult> result = restClient.getSearchClient().searchJql(jqlQuery, resultsSize, startAt, fields);

		return result.get();
	}

	public Issue getIssue(String key) throws ExecutionException, InterruptedException {
		return restClient.getIssueClient().getIssue(key).get();
	}
}
