package at.ac.tuwien.dst.mms.jama.rest;

import at.ac.tuwien.dst.mms.jama.model.Item;
import at.ac.tuwien.dst.mms.jama.rest.model.ItemResponse;
import at.ac.tuwien.dst.mms.jama.util.Config;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by XLin on 04.03.2016.
 */
@Service
public class JamaItemExtractor {
	@Autowired
	private RestTemplate restTemplate;

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	private String itemUri = Config.HOST + "/items";

	public List<Item> getAllItemsForProject(Integer id) {
		List<Item> items = new ArrayList<>();

		ItemResponse initialResponse = this.getItemsForProject(id, 0);
		items.addAll(initialResponse.getItems());

		int resultCount = initialResponse.getPageInfo().getResultCount();
		int totalResults = initialResponse.getPageInfo().getTotalResults();
		int startIndex = initialResponse.getPageInfo().getStartIndex();

		while(startIndex + resultCount < totalResults) {

			startIndex += resultCount;
			ItemResponse response = this.getItemsForProject(id, startIndex);
			items.addAll(response.getItems());
		}

		return items;
	}

	private ItemResponse getItemsForProject(Integer projectId, Integer startAt) {
		URI uri = UriComponentsBuilder
				.fromHttpUrl(itemUri)
				.queryParam("maxResults", Config.MAX_RESULTS)
				.queryParam("project", projectId)
				.queryParam("startAt", startAt)
				.build().encode().toUri();

		logger.info("Requesting items for project " + projectId + " starting at " + startAt);

		return restTemplate.getForObject(uri, ItemResponse.class);
	}

//	private List<Project> filterProjects(List<Project> projects) {
//		List<Project> filteredProjects = new ArrayList<>();
//
//		for(Project project : projects) {
//			if(!project.getFolder() && project.getKey() != null) {
//				filteredProjects.add(project);
//			}
//		}
//
//		return filteredProjects;
//	}
}
