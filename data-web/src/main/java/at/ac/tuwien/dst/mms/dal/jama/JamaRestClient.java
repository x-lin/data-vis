package at.ac.tuwien.dst.mms.dal.jama;

import at.ac.tuwien.dst.mms.dal.jama.dto.JamaActivityDTO;
import at.ac.tuwien.dst.mms.dal.jama.dto.JamaNodeDTO;
import at.ac.tuwien.dst.mms.dal.jama.dto.JamaProjectDTO;
import at.ac.tuwien.dst.mms.dal.jama.dto.JamaRelationshipDTO;
import at.ac.tuwien.dst.mms.util.Config;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
public class JamaRestClient {

	@Autowired
	private RestTemplate restTemplate;

	@Autowired(required=false)
	Logger logger;

	private String projectsUri = Config.JAMA_EXTRACTOR_HOST + "/projects";

	private String itemsUri = Config.JAMA_EXTRACTOR_HOST + "/items";

	private String itemUri = Config.JAMA_EXTRACTOR_HOST + "/item";

	private String relationshipsUri = Config.JAMA_EXTRACTOR_HOST + "/relationships";

	private String activitiesUri = Config.JAMA_EXTRACTOR_HOST + "/activities";

	public JamaProjectDTO[] getProjects() {
		logger.info("Fetching all projects on uri "+projectsUri + ".");

		JamaProjectDTO[] projects = restTemplate.getForEntity(URI.create(projectsUri), JamaProjectDTO[].class).getBody();

		System.out.println("projects: " + projects);

		return projects;
	}

	@Async
	public JamaNodeDTO[] getItems(Integer projectId) {
		URI uri = UriComponentsBuilder
				.fromHttpUrl(itemsUri)
				.queryParam("project", projectId)
				.queryParam("webhook", Config.JAMA_WEBHOOK_ITEMS)
				.build().encode().toUri();

		logger.info("Requesting all items for project " + projectId);

		return restTemplate.getForEntity(uri, JamaNodeDTO[].class).getBody();
	}

	public JamaNodeDTO getItem(long id) {
		URI uri = UriComponentsBuilder
				.fromHttpUrl(itemUri)
				.path("/" + id)
				.build().encode().toUri();

		logger.info("Requesting item with id " + id);

		ResponseEntity<JamaNodeDTO> entity = restTemplate.exchange(uri, HttpMethod.GET, null, JamaNodeDTO.class);
		logger.info("entity is: ..-");
		logger.info(entity.toString());
		logger.info("body...");
		JamaNodeDTO node = entity.getBody();
		logger.info("fetched");
		logger.info("" + node);

		return node;
	}

	public List<JamaRelationshipDTO> getRelationshipsForItem(Long id) {
		URI uri = UriComponentsBuilder
				.fromHttpUrl(itemUri)
				.path("/" + id)
				.path("/relationships")
				.build().encode().toUri();

		logger.info("Requesting all relationships for item " + id);

		return Arrays.asList(restTemplate.getForEntity(uri, JamaRelationshipDTO[].class).getBody());
	}

	@Async
	public void getRelationships(Integer projectId) {
		URI uri = UriComponentsBuilder
				.fromHttpUrl(relationshipsUri)
				.queryParam("project", projectId)
				.queryParam("webhook", Config.JAMA_WEBHOOK_RELATIONSHIPS)
				.build().encode().toUri();

		logger.info("Requesting all relationships for project " + projectId);

		restTemplate.getForEntity(uri, JamaRelationshipDTO[].class).getBody();
	}

	public JamaActivityDTO[] getUpdates(Date dateFrom, Date dateTo){
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");

		UriComponentsBuilder builder = UriComponentsBuilder
				.fromHttpUrl(activitiesUri)
				.queryParam("project", "133");

		if(dateFrom != null) {
			builder.queryParam("dateFrom", df.format(dateFrom));
		}

		if(dateTo != null) {
			builder.queryParam("dateTo", df.format(dateTo));
		}

		URI uri = builder.build().encode().toUri();

		return restTemplate.getForEntity(uri, JamaActivityDTO[].class).getBody();
	}
}