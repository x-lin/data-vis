package at.ac.tuwien.dst.mms;

import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.graphdb.factory.GraphDatabaseFactory;
import org.neo4j.graphdb.factory.GraphDatabaseSettings;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.neo4j.config.EnableNeo4jRepositories;
import org.springframework.data.neo4j.config.Neo4jConfiguration;

import java.io.IOException;

/**
 * Created by xlin on 09.01.2016.
 */
@Configuration
@EnableNeo4jRepositories(basePackages={"at.ac.tuwien.dst.mms.dal.repo"})
public class Neo4jConfig extends Neo4jConfiguration {

	public Neo4jConfig() {
		setBasePackage("at.ac.tuwien.dst.mms.dal.model");
	}

	@Bean(destroyMethod = "shutdown")
	GraphDatabaseService graphDatabaseService() {
		//return new SpringCypherRestGraphDatabase(Config.NEO4J_HOST);
		return new GraphDatabaseFactory()
				.newEmbeddedDatabaseBuilder("app.db")
				.setConfig( GraphDatabaseSettings.allow_store_upgrade, "true" )
				.newGraphDatabase();
	}
}