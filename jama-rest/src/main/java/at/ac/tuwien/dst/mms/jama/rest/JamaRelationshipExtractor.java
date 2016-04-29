package at.ac.tuwien.dst.mms.jama.rest;

import at.ac.tuwien.dst.mms.jama.model.Relationship;
import at.ac.tuwien.dst.mms.jama.rest.model.RelationshipResponse;
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
 * Created by XLin on 07.03.2016.
 */
@Service
public class JamaRelationshipExtractor {
	@Autowired
	private RestTemplate restTemplate;

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	private String relationshipUri = Config.HOST + "/relationships";

	public List<Relationship> getAllRelationshipsForProject(Integer id) {
		List<Relationship> relationships = new ArrayList<>();

		RelationshipResponse initialResponse = this.getRelationshipsForProject(id, 0);
		if(initialResponse != null && initialResponse.getRelationships() != null) {
			relationships.addAll(initialResponse.getRelationships());

			int resultCount = initialResponse.getPageInfo().getResultCount();
			int totalResults = initialResponse.getPageInfo().getTotalResults();
			int startIndex = initialResponse.getPageInfo().getStartIndex();

			while(startIndex + resultCount < totalResults) {

				startIndex += resultCount;
				RelationshipResponse response = this.getRelationshipsForProject(id, startIndex);
				if(response.getRelationships() != null) {
					//				System.out.println(response.getRelationships());
					relationships.addAll(response.getRelationships());
				}
			}
		}

		return relationships;
	}

	public RelationshipResponse getRelationshipsForProject(Integer projectId, Integer startAt) {
		URI uri = UriComponentsBuilder
				.fromHttpUrl(relationshipUri)
				.queryParam("maxResults", Config.MAX_RESULTS)
				.queryParam("project", projectId)
				.queryParam("startAt", startAt)
				.build().encode().toUri();

		logger.info("Requesting relationships for project " + projectId + " starting at " + startAt);

		return restTemplate.getForObject(uri, RelationshipResponse.class);
	}

	public RelationshipResponse getRelationshipsForItem(Long itemId) {
		URI uri = UriComponentsBuilder
				.fromHttpUrl(Config.HOST + "/items")
				.path("/" + itemId)
				.path("/downstreamrelationships")
				.build().encode().toUri();

		logger.info("Requesting relationships for item " + itemId);

		return restTemplate.getForObject(uri, RelationshipResponse.class);
	}

	public RelationshipResponse getUpstreamRelationshipsForItem(Long itemId) {
		URI uri = UriComponentsBuilder
				.fromHttpUrl(Config.HOST + "/items")
				.path("/" + itemId)
				.path("/upstreamrelationships")
				.build().encode().toUri();

		logger.info("Requesting relationships for item " + itemId);

		return restTemplate.getForObject(uri, RelationshipResponse.class);
	}

	public List<Relationship> getAllRelationshipsForItem(Long itemId) {
		List<Relationship> relationships = new ArrayList<>();
		List<Relationship> upstream = this.getUpstreamRelationshipsForItem(itemId).getRelationships();
		List<Relationship> downstream = this.getRelationshipsForItem(itemId).getRelationships();

		if (upstream != null) {
			relationships.addAll(upstream);
		}

		if (downstream != null) {
			relationships.addAll(downstream);
		}

		return relationships;
	}
}
