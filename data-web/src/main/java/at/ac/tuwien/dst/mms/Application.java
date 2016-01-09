package at.ac.tuwien.dst.mms;

import at.ac.tuwien.dst.mms.dal.extract.rest.JiraRestClient;
import at.ac.tuwien.dst.mms.dal.jobs.JiraExtractor;
import at.ac.tuwien.dst.mms.dal.repo.NeoWriter;
import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.graphdb.factory.GraphDatabaseFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.neo4j.config.EnableNeo4jRepositories;
import org.springframework.data.neo4j.config.Neo4jConfiguration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@EnableAsync
@Configuration
@EnableNeo4jRepositories(value={"at.ac.tuwien.dst.mms.dal.repo"})
@SpringBootApplication
public class Application extends Neo4jConfiguration {

	public Application() throws IOException {
		//FileUtils.deleteDirectory(new File("target/app.db"));

		setBasePackage("at.ac.tuwien.dst.mms.dal.model");
	}

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean(destroyMethod = "shutdown")
	public GraphDatabaseService graphDatabaseService() {
		return new GraphDatabaseFactory().newEmbeddedDatabase("app.db");
	}

	@Bean
	public NeoWriter neoWriter() {
		return new NeoWriter();
	}

	@Bean
	public JiraExtractor jiraExtractor() {
		return new JiraExtractor();
	}

	@Bean
	public JiraRestClient jiraRestClient() {
		return new JiraRestClient();
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}
}
