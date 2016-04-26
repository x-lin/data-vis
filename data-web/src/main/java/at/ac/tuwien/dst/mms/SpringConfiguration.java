package at.ac.tuwien.dst.mms;

import at.ac.tuwien.dst.mms.dal.jama.JamaExtractor;
import at.ac.tuwien.dst.mms.dal.jama.JamaRestClient;
import at.ac.tuwien.dst.mms.dal.jira.JiraExtractor;
import at.ac.tuwien.dst.mms.dal.jira.JiraRestClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.client.RestTemplate;

@EnableTransactionManagement
@Configuration
public class SpringConfiguration {
	@Bean
	public JiraExtractor jiraExtractor() {
		return new JiraExtractor();
	}

	@Bean
	public JiraRestClient jiraRestClient() {
		return new JiraRestClient();
	}

	@Bean
	public JamaExtractor jamaExtractor() {
		return new JamaExtractor();
	}

	@Bean
	public JamaRestClient jamaRestClient() {
		return new JamaRestClient();
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}
}
