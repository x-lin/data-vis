package at.ac.tuwien.dst.mms.jira.rest;

import com.atlassian.jira.rest.client.api.domain.BasicProject;
import com.atlassian.jira.rest.client.api.domain.Issue;
import com.atlassian.jira.rest.client.api.domain.SearchResult;
import org.apache.commons.collections4.IteratorUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutionException;

/**
 * REST service for fetching data from a JIRA interface.
 */
//@Path("/data")
@Path("")
public class JiraController {
	private Logger logger = LoggerFactory.getLogger(this.getClass());

	private JiraRestExtractor extractor = new JiraRestExtractor();

	/**
	 * Get all issues for a project via a webhook or as a direct response. Fetching the results
	 * via the webhook is the preferred way, as the size of results may be quite big for some
	 * projects and may cause some issues with memory size, response time or similar.
	 *
	 * @param projectKey the key of the project for the issues to be requested
	 * @param webhook the URI to the webhook, where the results are returned; leaving it empty will
	 *                cause the responses to be returned directly, otherwise the results are directed
	 *                in batches to the webhook; the size of the batch is defined by the result limit
	 *                of the corresponding JIRA REST API;
	 * @return if no webhook is specified, this interface will return a list of issues as JSON, otherwise
	 * 				the return is null and the results are directed as a POST request to the webhook URI
	 * @throws ExecutionException
	 * @throws InterruptedException
	 * @throws IOException
	 */
	@GET
	@Path("/issues")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Issue> issues(
			@QueryParam("projectKey") String projectKey,
			@QueryParam("updated") String updated,
			@DefaultValue("") @QueryParam("webhook") String webhook
	) throws ExecutionException, InterruptedException, IOException {
		SearchResult result = extractor.getIssues(projectKey, updated);

		List<Issue> issues = null;
		boolean isWebhook = (webhook != null && webhook.length() > 0);

		if (!isWebhook) {
			issues = IteratorUtils.toList(result.getIssues().iterator());
		} else {
			RestClient.sendPost(webhook, result.getIssues());
		}

		while(result.getTotal() > result.getStartIndex() + result.getMaxResults()) {
			result = extractor.getIssues(projectKey, result.getStartIndex() + result.getMaxResults(), updated);
			if(!isWebhook) {
				issues.addAll(IteratorUtils.toList(result.getIssues().iterator()));
				logger.info("Returning " + result.getMaxResults() + " issues as response.");
			} else {
				RestClient.sendPost(webhook, result.getIssues());
				logger.info("Sent " + result.getMaxResults() + " issues to webhook uri " + webhook);
			}
		}

		return issues;
	}

	/**
	 * Returns an issue for with the specified key.
	 *
	 * @param key key of the issue
	 * @return an issue matching the key
	 * @throws ExecutionException
	 * @throws InterruptedException
	 */
	@GET
	@Path("/issue/{key}")
	@Produces(MediaType.APPLICATION_JSON)
	public Issue getIssue(
			@PathParam("key") String key
	) throws ExecutionException, InterruptedException {
		return extractor.getIssue(key);
	}

	/**
	 * Returns a list of all projects of the specified JIRA REST interface directly
	 * or via a webhook.
	 *
	 * @param webhook webhook for the results to be directed to; if no webhook is specified,
	 *                the results are returned directly
	 * @return a list of projects, if a webhook is specified, the response will be null and the
	 * 			results are returned via webhook
	 * @throws IOException
	 */
	@GET
	@Path("/projects")
	@Produces(MediaType.APPLICATION_JSON)
	public List<BasicProject> getAllProjects(
			@DefaultValue("") @QueryParam("webhook") String webhook
	) throws IOException {
		Iterable<BasicProject> result = null;
		try {
			result = extractor.getProjects();
		} catch (ExecutionException | InterruptedException e) {
			e.printStackTrace();
		}

		//iterable results in the json not being returned properly, thus convert it to a list
		List<BasicProject> copy = IteratorUtils.toList(result.iterator());

		if (webhook == null || webhook.length() == 0) {
			logger.info("Returning " + copy.size() + " projects as response.");

			return copy;
		} else {
			RestClient.sendPost(webhook, copy);

			logger.info("Sent " + copy.size() + " projects to webhook uri " + webhook);

			return null;
		}
	}
}
