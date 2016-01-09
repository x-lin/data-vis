package at.ac.tuwien.dst.mms.jira.rest;

import at.ac.tuwien.dst.mms.jira.util.Config;
import com.atlassian.jira.rest.client.api.JiraRestClient;
import com.atlassian.jira.rest.client.api.domain.BasicProject;
import com.atlassian.jira.rest.client.api.domain.Issue;
import com.atlassian.jira.rest.client.api.domain.SearchResult;
import com.atlassian.jira.rest.client.auth.AnonymousAuthenticationHandler;
import com.atlassian.jira.rest.client.internal.async.AsynchronousJiraRestClientFactory;
import com.atlassian.util.concurrent.Promise;

import java.net.URI;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ExecutionException;

/**
 * Extracts data from the JIRA REST API.
 */
public class JiraRestExtractor {

	private JiraRestClient restClient;

	public JiraRestExtractor() {
		AsynchronousJiraRestClientFactory factory = new AsynchronousJiraRestClientFactory();
		AnonymousAuthenticationHandler authHandler = new AnonymousAuthenticationHandler();

		restClient = factory.create(URI.create(Config.JIRA_URI), authHandler);
	}

	public Iterable<BasicProject> getProjects() throws ExecutionException, InterruptedException {
		Promise<Iterable<BasicProject>> projects = restClient.getProjectClient().getAllProjects();

		return projects.get();
	}

	public SearchResult getIssues(String projectKey) throws ExecutionException, InterruptedException {
		return this.getIssues(projectKey, 0);
	}

	public SearchResult getIssues(String projectKey, int startAt) throws ExecutionException, InterruptedException {
		//result size of -1 means, the JIRA REST API will return the maximum batch size allowed.
		return this.getIssues(projectKey, startAt, -1);
	}

	public SearchResult getIssues(String projectKey, int startAt, int resultsSize) throws ExecutionException, InterruptedException {
		String jqlQuery = "project="+projectKey;

		Set<String> fields = new HashSet<>(Arrays.asList("summary", "issuetype", "created", "updated", "project", "status"));

		Promise<SearchResult> result = restClient.getSearchClient().searchJql(jqlQuery, resultsSize, startAt, fields);

		return result.get();
	}

	public Issue getIssue(String key) throws ExecutionException, InterruptedException {
		return restClient.getIssueClient().getIssue(key).get();
	}
}
