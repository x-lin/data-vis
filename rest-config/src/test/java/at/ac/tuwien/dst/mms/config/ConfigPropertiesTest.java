package at.ac.tuwien.dst.mms.config;

import org.junit.Test;

import java.net.URI;
import java.util.Optional;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.isEmptyString;

/**
 * @author LinX
 */
public class ConfigPropertiesTest {
    @Test
    public void _loadUserAccount_returnsNonEmptyOptional() {
        //WHEN
        final Optional<UserAccount> userAccount = ConfigProperties.USER_CREDENTIALS;

        //THEN
        assertThat( userAccount.isPresent(), equalTo( true ) );
    }

    @Test
    public void _readingJiraUri_returnsNonEmptyUri() {
        //WHEN
        final URI jiraUri = ConfigProperties.JIRA_URI;

        //THEN
        assertThat( jiraUri.getHost(), not( isEmptyString() ) );
    }

    @Test
    public void _readingJamaUri_returnsNonEmptyUri() {
        //WHEN
        final URI jamaUri = ConfigProperties.JAMA_URI;

        //THEN
        assertThat( jamaUri.getHost(), not( isEmptyString() ) );
    }
}
