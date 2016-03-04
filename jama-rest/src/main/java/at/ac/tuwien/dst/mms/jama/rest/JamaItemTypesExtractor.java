package at.ac.tuwien.dst.mms.jama.rest;

import at.ac.tuwien.dst.mms.jama.model.ItemType;
import at.ac.tuwien.dst.mms.jama.rest.model.ItemTypeResponse;
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
public class JamaItemTypesExtractor {
	@Autowired
	private RestTemplate restTemplate;

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	private String itemTypesUri = Config.HOST + "/itemtypes";

	public List<ItemType> getAllItemTypes() {
		List<ItemType> itemTypes = new ArrayList<>();

		ItemTypeResponse initialResponse = this.getItemTypes(0);
		itemTypes.addAll(initialResponse.getItemTypes());

		int resultCount = initialResponse.getPageInfo().getResultCount();
		int totalResults = initialResponse.getPageInfo().getTotalResults();
		int startIndex = initialResponse.getPageInfo().getStartIndex();

		while(startIndex + resultCount < totalResults) {
			startIndex += resultCount;
			ItemTypeResponse response = this.getItemTypes(startIndex);
			itemTypes.addAll(response.getItemTypes());
		}

		return itemTypes;
	}

	private ItemTypeResponse getItemTypes(int startAt) {
		URI uri = UriComponentsBuilder
				.fromHttpUrl(itemTypesUri)
				.queryParam("maxResults", Config.MAX_RESULTS)
				.queryParam("startAt", startAt)
				.build().encode().toUri();

		logger.info("Requesting item types starting at " + startAt);

		return restTemplate.getForObject(uri, ItemTypeResponse.class);
	}
}
