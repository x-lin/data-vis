package at.ac.tuwien.dst.mms.test;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Application class for tests. Test classes can't use Application.class from main module,
 * as they need a different neo4j configuration class for testing and @EnableAutoConfiguration
 * causes trouble when trying to exclude configuration classes.
 */
@SpringBootApplication
public class TestApplication {
	public static void main(String[] args) {
		SpringApplication.run(TestApplication.class, args);
	}
}
