package at.ac.tuwien.dst.mms.jama;

import at.ac.tuwien.dst.mms.jama.rest.ItemTypeLookupRegistry;
import at.ac.tuwien.dst.mms.jama.rest.JamaItemTypesExtractor;
import at.ac.tuwien.dst.mms.jama.util.Config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public RestTemplate restTemplate() {
		RestTemplate restTemplate = new TestRestTemplate(Config.USERNAME, Config.PASSWORD);

		return restTemplate;
	}

	@Autowired
	JamaItemTypesExtractor extractor;

	@Autowired
	ItemTypeLookupRegistry itemTypeLookupRegistry;

	@Bean
	public ItemTypeLookupRegistry itemTypeLookupRegistry() {
		return new ItemTypeLookupRegistry(extractor);
	}

	@PostConstruct
	public void initItemTypes() {
		ItemTypeLookupRegistry.set(itemTypeLookupRegistry);
	}
}
