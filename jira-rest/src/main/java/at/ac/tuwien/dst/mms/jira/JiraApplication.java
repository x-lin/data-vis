package at.ac.tuwien.dst.mms.jira;

import at.ac.tuwien.dst.mms.jira.rest.JiraController;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath( "" )
public class JiraApplication extends Application {
    /**
     * Define the REST controllers.
     */
    @Override
    public Set<Class<?>> getClasses() {
        return new HashSet<>( Arrays.asList( JiraController.class ) );
    }
}