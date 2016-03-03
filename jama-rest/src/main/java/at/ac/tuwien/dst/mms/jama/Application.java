package at.ac.tuwien.dst.mms.jama;

import at.ac.tuwien.dst.mms.jama.util.Config;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

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
}
