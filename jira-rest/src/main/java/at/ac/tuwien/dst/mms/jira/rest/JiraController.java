package at.ac.tuwien.dst.mms.jira.rest;

import at.ac.tuwien.dst.mms.jira.rest.shaded.com.atlassian.jira.rest.client.api.domain.BasicProject;
import at.ac.tuwien.dst.mms.jira.rest.shaded.com.atlassian.jira.rest.client.api.domain.Issue;
import at.ac.tuwien.dst.mms.jira.rest.shaded.com.atlassian.jira.rest.client.api.domain.SearchResult;
import at.ac.tuwien.dst.mms.jira.rest.shaded.com.atlassian.jira.rest.client.internal.async.AsynchronousJiraRestClientFactory;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.net.URI;
import java.util.List;

/**
 * REST service for fetching data from a JIRA interface.
 */
@Path( "" )
public class JiraController {
    private static final Logger LOG = LoggerFactory.getLogger( JiraController.class );

    private final JiraRestExtractor extractor = new JiraRestExtractor( new AsynchronousJiraRestClientFactory() );

    /**
     * Get all getIssuesForProject for a project via a webhook or as a direct response. Fetching the results
     * via the webhook is the preferred way, as the size of results may be quite big for some
     * projects and may cause some getIssuesForProject with memory size, response time or similar.
     *
     * @param projectKey the key of the project for the getIssuesForProject to be requested
     * @param webhook    the URI to the webhook, where the results are returned; leaving it empty will
     *                   cause the responses to be returned directly, otherwise the results are directed
     *                   in batches to the webhook; the size of the batch is defined by the result limit
     *                   of the corresponding JIRA REST API;
     * @return if no webhook is specified, this interface will return a list of getIssuesForProject as JSON, otherwise
     * the return is null and the results are directed as a POST request to the webhook URI
     */
    @GET
    @Path( "/issues" )
    @Produces( MediaType.APPLICATION_JSON )
    public List<Issue> getIssuesForProject(
            @QueryParam( "projectKey" ) String projectKey,
            @QueryParam( "updated" ) String updated, @QueryParam( "webhook" ) URI webhook ) {
        SearchResult result = this.extractor.getIssues( projectKey, updated );


        List<Issue> issues = null;

        if ( webhook == null ) {
            ImmutableList.Builder<Issue> issueBuilder = ImmutableList.builder();
            issues = Lists.newArrayList( result.getIssues() );

        } else {
            RestClient.sendPost( webhook, result.getIssues() );
        }

        while ( result.getTotal() > result.getStartIndex() + result.getMaxResults() ) {
            result = this.extractor.getIssues( projectKey, result.getStartIndex() + result.getMaxResults(), updated );
            if ( webhook == null ) {
                issues.addAll( result.getIssues() ))
                LOG.info( "Returning " + result.getMaxResults() + " getIssuesForProject as response." );
            } else {
                RestClient.sendPost( webhook, result.getIssues() );
                LOG.info( "Sent " + result.getMaxResults() + " getIssuesForProject to webhook uri " + webhook );
            }
        }

        return issues;
    }

    /**
     * Returns an issue with the specified key.
     *
     * @param key key of the issue
     * @return an issue matching the key
     */
    @GET
    @Path( "/issue/{key}" )
    @Produces( MediaType.APPLICATION_JSON )
    public Issue getSingleIssue( @PathParam( "key" ) final String key ) {
        return this.extractor.getIssue( key );
    }

    /**
     * Returns a list of all projects of the specified JIRA REST interface.
     *
     * @return a list of projects
     */
    @GET
    @Path( "/projects" )
    @Produces( MediaType.APPLICATION_JSON )
    public List<BasicProject> getAllProjects() {
        final List<BasicProject> projects = this.extractor.getProjects();
        LOG.info( "Returning {} projects as response: {}", projects.size(), projects );
        return projects;
    }
}
