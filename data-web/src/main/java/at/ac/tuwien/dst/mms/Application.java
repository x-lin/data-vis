package at.ac.tuwien.dst.mms;

import at.ac.tuwien.dst.mms.dal.DataReader;
import at.ac.tuwien.dst.mms.dal.extract.rest.JiraRestClient;
import at.ac.tuwien.dst.mms.dal.impl.NeoRepositoryReader;
import at.ac.tuwien.dst.mms.dal.impl.NeoRepositoryWriter;
import at.ac.tuwien.dst.mms.dal.jobs.JiraExtractor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.client.RestTemplate;

@EnableAsync
@EnableTransactionManagement
@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public NeoRepositoryWriter neoWriter() {
		return new NeoRepositoryWriter();
	}

	@Bean
	public DataReader dataReader() {
		return new NeoRepositoryReader();
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
