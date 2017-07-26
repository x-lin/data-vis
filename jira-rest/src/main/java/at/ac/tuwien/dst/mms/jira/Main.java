package at.ac.tuwien.dst.mms.jira;

/**
 * Created by LinX on 14.05.2017.
 */

import at.ac.tuwien.dst.mms.jira.rest.JiraController;
import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.net.URI;

/**
 * Main class.
 */
public class Main {
    private static final Logger LOG = LoggerFactory.getLogger( Main.class );


    public static final String BASE_URI = "http://localhost:8080/";

    /**
     * Starts Grizzly HTTP server exposing JAX-RS resources defined in this application.
     *
     * @return Grizzly HTTP server.
     */
    public static HttpServer startServer() {
        final ResourceConfig rc = new ResourceConfig();

        rc.registerClasses( JiraController.class );

        // create and start a new instance of grizzly http server
        // exposing the Jersey application at BASE_URI
        return GrizzlyHttpServerFactory.createHttpServer( URI.create( BASE_URI ), rc );
    }

    public static void main( final String[] args ) throws IOException {
        startServer();
        LOG.info( "Application started at {}.", BASE_URI );
    }
}
