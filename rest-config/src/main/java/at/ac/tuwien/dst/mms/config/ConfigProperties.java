package at.ac.tuwien.dst.mms.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.util.Optional;
import java.util.Properties;

/**
 * Contains the configuration for some customizable values.
 */
public class ConfigProperties {
    private static final Logger LOG = LoggerFactory.getLogger( ConfigProperties.class );

    private static final String PROPERTIES_FILE = "config.properties";

    private static final String JIRA_URI_PROPERTIES_KEY = "jira.rest.uri";

    private static final String JAMA_URI_PROPERTIES_KEY = "jama.rest.uri";

    private static final String USERNAME_PROPERTIES_KEY = "jira.username";

    private static final String PASSWORD_PROPERTIES_KEY = "jira.password";

    static {
        final Properties properties = new Properties();

        try ( InputStream in = ConfigProperties.class.getResourceAsStream( "/" + PROPERTIES_FILE ) ) {
            properties.load( in );
            JIRA_URI = URI.create( properties.getProperty( JIRA_URI_PROPERTIES_KEY ) );
            JAMA_URI = URI.create( properties.getProperty( JAMA_URI_PROPERTIES_KEY ) );

            USER_CREDENTIALS = Optional.ofNullable( properties.getProperty( USERNAME_PROPERTIES_KEY ) ).map( user -> {
                final String password = Optional.ofNullable( properties.getProperty( PASSWORD_PROPERTIES_KEY ) )
                        .orElse( "" );
                return new UserAccount( user, password );
            } );
        } catch ( final IOException e ) {
            LOG.error( "Configuration could not be loaded!" );
            throw new IllegalArgumentException( e );
        }
    }

    public static final URI JAMA_URI;

    public static final URI JIRA_URI;

    public static Optional<UserAccount> USER_CREDENTIALS;

}
