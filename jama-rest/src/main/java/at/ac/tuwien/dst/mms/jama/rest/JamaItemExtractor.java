package at.ac.tuwien.dst.mms.jama.rest;

import at.ac.tuwien.dst.mms.jama.model.Item;
import at.ac.tuwien.dst.mms.jama.rest.model.ItemResponse;
import at.ac.tuwien.dst.mms.jama.rest.model.ItemSingleResponse;
import at.ac.tuwien.dst.mms.jama.util.Config;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
			if(response.getItems() != null) {
				items.addAll(response.getItems());
			}
		}

		return items;
	}

	public Item getItem(Long id) {
		URI uri = UriComponentsBuilder
				.fromHttpUrl(itemUri+"/"+id)
				.build().encode().toUri();

		logger.info("Requesting item " + id);

		return restTemplate.getForObject(uri, ItemSingleResponse.class).getItem();
	}

	public Map<Long, Item> indexItems(List<Item> items) {
		Map<Long, Item> itemsMap = new HashMap<>();

		for(Item item : items) {
			itemsMap.put(item.getJamaId(), item);
		}

		return itemsMap;
	}

	public ItemResponse getItemsForProject(Integer projectId, Integer startAt) {
		URI uri = UriComponentsBuilder
				.fromHttpUrl(itemUri)
				.queryParam("maxResults", Config.MAX_RESULTS)
				.queryParam("project", projectId)
				.queryParam("startAt", startAt)
				.build().encode().toUri();

		logger.info("Requesting items for project " + projectId + " starting at " + startAt);

		return restTemplate.getForObject(uri, ItemResponse.class);
	}
}
