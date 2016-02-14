package at.ac.tuwien.dst.mms.test;

import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.graphdb.factory.GraphDatabaseFactory;
import org.neo4j.graphdb.factory.GraphDatabaseSettings;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.neo4j.config.EnableNeo4jRepositories;
import org.springframework.data.neo4j.config.Neo4jConfiguration;

/**
 * Created by xlin on 09.01.2016.
 */
@Configuration
@EnableNeo4jRepositories(basePackages={"at.ac.tuwien.dst.mms.dal.repo"})
//@Profile("test")
public class Neo4jTestConfig extends Neo4jConfiguration {

	public Neo4jTestConfig() {
		setBasePackage("at.ac.tuwien.dst.mms.model");
	}

	@Bean(destroyMethod = "shutdown")
	GraphDatabaseService graphDatabaseService() {
		//return new SpringCypherRestGraphDatabase(Config.NEO4J_HOST);
		return new GraphDatabaseFactory()
				.newEmbeddedDatabaseBuilder("data-web/target/test.db")
				.setConfig( GraphDatabaseSettings.allow_store_upgrade, "true" )
				.newGraphDatabase();
	}
}