package at.ac.tuwien.dst.mms.jira.rest;

import at.ac.tuwien.dst.mms.config.ConfigProperties;
import at.ac.tuwien.dst.mms.jira.rest.shaded.com.atlassian.jira.rest.client.api.AuthenticationHandler;
import at.ac.tuwien.dst.mms.jira.rest.shaded.com.atlassian.jira.rest.client.api.JiraRestClient;
import at.ac.tuwien.dst.mms.jira.rest.shaded.com.atlassian.jira.rest.client.api.JiraRestClientFactory;
import at.ac.tuwien.dst.mms.jira.rest.shaded.com.atlassian.jira.rest.client.api.RestClientException;
import at.ac.tuwien.dst.mms.jira.rest.shaded.com.atlassian.jira.rest.client.api.domain.BasicProject;
import at.ac.tuwien.dst.mms.jira.rest.shaded.com.atlassian.jira.rest.client.api.domain.Issue;
import at.ac.tuwien.dst.mms.jira.rest.shaded.com.atlassian.jira.rest.client.api.domain.SearchResult;
import at.ac.tuwien.dst.mms.jira.rest.shaded.com.atlassian.jira.rest.client.auth.AnonymousAuthenticationHandler;
import at.ac.tuwien.dst.mms.jira.rest.shaded.com.atlassian.jira.rest.client.auth.BasicHttpAuthenticationHandler;
import at.ac.tuwien.dst.mms.jira.rest.shaded.com.atlassian.util.concurrent.Promise;
import com.google.common.collect.ImmutableList;
import jersey.repackaged.com.google.common.collect.Sets;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ExecutionException;

/**
 * Extracts data from the JIRA REST API.
 */
public class JiraRestExtractor {
    //result size of -1 means, the JIRA REST API will return the maximum batch size allowed.
    private static final int MAX_SIZE_ALLOWED = -1;

    private static final int INITIAL_START_AT_POSITION = 0;

    private static final Logger LOG = LoggerFactory.getLogger( JiraRestExtractor.class );

    private final JiraRestClient restClient;

    public JiraRestExtractor( final JiraRestClientFactory restClientFactory ) {
        this.restClient = restClientFactory.create( ConfigProperties.JIRA_URI, createAuthHandler() );
        LOG.debug( "JIRA REST Client created." );
    }

    public List<BasicProject> getProjects() {
        try {
            return ImmutableList.copyOf( this.restClient.getProjectClient().getAllProjects().get() );
        } catch ( InterruptedException | ExecutionException e ) {
            throw new RestClientException( e );
        }
    }

    public SearchResult getIssues( final String projectKey, final String updated ) {
        return getIssues( projectKey, INITIAL_START_AT_POSITION, updated );
    }

    public SearchResult getIssues( final String projectKey, final int startAt, final String updated ) {
        return getIssues( projectKey, startAt, MAX_SIZE_ALLOWED, updated );
    }

    public SearchResult getIssues( final String projectKey, final int startAt, final int resultsSize, final String updated ) {
        String jqlQuery = "project=" + projectKey;
        jqlQuery += Optional.ofNullable( updated ).map( u -> " AND updated > -" + u ).orElse( "" );
        final Set<String> fields = Sets.newHashSet( "summary", "issuetype", "created", "updated", "project",
                "status", "reporter", "assignee" );
        final Promise<SearchResult> result = this.restClient.getSearchClient()
                .searchJql( jqlQuery, resultsSize, startAt, fields );

        try {
            return result.get();
        } catch ( InterruptedException | ExecutionException e ) {
            throw new RestClientException( e );
        }
    }

    public Issue getIssue( final String key ) {
        try {
            return this.restClient.getIssueClient().getIssue( key ).get();
        } catch ( InterruptedException | ExecutionException e ) {
            throw new RestClientException( e );
        }
    }

    /**
     * Creates the authentication handler for a concrete user, if one is specified. Note, that for SSL-encrypted
     * websites, there may be an issue with the certification path not recognized. To resolve this issue, you may
     * follow the instructions from the JIRA support page:
     * https://confluence.atlassian.com/jira/connecting-to-ssl-services-117455.html
     *
     * @return the appropriate authentication handler
     */
    private static AuthenticationHandler createAuthHandler() {
        return ConfigProperties.USER_CREDENTIALS
                .map( cred -> ( AuthenticationHandler )
                        new BasicHttpAuthenticationHandler( cred.getUsername(), cred.getPassword() ) )
                .orElseGet( AnonymousAuthenticationHandler::new );
    }
}
