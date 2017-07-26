package at.ac.tuwien.dst.mms.jama;

import at.ac.tuwien.dst.mms.jama.rest.ItemTypeLookupRegistry;
import at.ac.tuwien.dst.mms.jama.rest.JamaListExtractor;
import at.ac.tuwien.dst.mms.jama.rest.StatusLookupRegistry;
import at.ac.tuwien.dst.mms.jama.util.Config;
import com.jamasoftware.services.restclient.JamaConfig;
import com.jamasoftware.services.restclient.exception.RestClientException;
import com.jamasoftware.services.restclient.jamaclient.JamaClient;
import com.jamasoftware.services.restclient.jamadomain.core.JamaDomainObject;
import com.jamasoftware.services.restclient.jamadomain.core.JamaInstance;
import com.jamasoftware.services.restclient.jamadomain.lazyresources.JamaItem;
import com.jamasoftware.services.restclient.jamadomain.lazyresources.JamaProject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import java.util.List;

@SpringBootApplication
public class Application {

	public static void main(String[] args) throws RestClientException, InterruptedException {
//		//Projects
//		try {
//			JamaInstance jamaInstance = new JamaInstance(new JamaConfig(true, "config.properties"));
//			List<JamaProject> projects = jamaInstance.getProjects();
//			projects.stream().forEach(p -> System.out.println(p.getName() + ":" + p.getId()));
//			System.out.println("number of projects: " + projects.size());
//		} catch (RestClientException e) {
//			e.printStackTrace();
//		}

		//Items
		JamaInstance jamaInstance = new JamaInstance(new JamaConfig(true, "config.properties"));
		jamaInstance.getItemsForProject(152);
		System.out.println("*************************");
		System.out.println("second iteration: ");
		Thread.sleep(5000);
				//.forEach(i -> System.out.println(i.getName() + ":" + i.getCreatedDate()));
		jamaInstance.getItemsForProject(152);

		//SpringApplication.run(Application.class, args);
	}

	@Bean
	public RestTemplate restTemplate() {
		return new TestRestTemplate(Config.USERNAME, Config.PASSWORD);
	}

	@Autowired
	ItemTypeLookupRegistry itemTypeLookupRegistry;

	@Autowired
	StatusLookupRegistry statusLookupRegistry;

	@Autowired
	JamaListExtractor extractor;

	@Bean
	public ItemTypeLookupRegistry itemTypeLookupRegistry() {
		return new ItemTypeLookupRegistry(extractor);
	}

	@Bean
	public StatusLookupRegistry statusLookupRegistry() {
		return new StatusLookupRegistry(extractor);
	}

	@PostConstruct
	public void initItemTypes() {
		ItemTypeLookupRegistry.set(itemTypeLookupRegistry);
		StatusLookupRegistry.set(statusLookupRegistry);
	}
}
