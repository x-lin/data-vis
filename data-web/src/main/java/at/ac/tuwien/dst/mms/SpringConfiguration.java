package at.ac.tuwien.dst.mms;

import at.ac.tuwien.dst.mms.dal.DataWriter;
import at.ac.tuwien.dst.mms.dal.extract.rest.JiraRestClient;
import at.ac.tuwien.dst.mms.dal.impl.NeoRepositoryWriter;
import at.ac.tuwien.dst.mms.dal.jobs.JiraExtractor;
import at.ac.tuwien.dst.mms.dal.util.RepositoryService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.client.RestTemplate;

@EnableTransactionManagement
@Configuration
public class SpringConfiguration {
	@Bean
	public DataWriter neoWriter() {
		return new NeoRepositoryWriter();
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

	@Bean
	public RepositoryService repositoryService() {
		return new RepositoryService();
	}
}
