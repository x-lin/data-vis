package at.ac.tuwien.dst.mms.jama.rest;

import at.ac.tuwien.dst.mms.jama.model.Project;
import at.ac.tuwien.dst.mms.jama.rest.model.ProjectResponse;
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
 * Created by XLin on 03.03.2016.
 */
@Service
public class JameProjectExtractor {
	@Autowired
	private RestTemplate restTemplate;

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	private String projectUri = Config.HOST + "/projects";

	public List<Project> getAllProjects() {
		List<Project> projects = new ArrayList<>();

		ProjectResponse initialResponse = this.getProjects(0);
		projects.addAll(this.filterProjects(initialResponse.getProjects()));

		int resultCount = initialResponse.getPageInfo().getResultCount();
		int totalResults = initialResponse.getPageInfo().getTotalResults();
		int startIndex = initialResponse.getPageInfo().getStartIndex();

		while(startIndex + resultCount < totalResults) {
			startIndex += resultCount;
			ProjectResponse response = this.getProjects(startIndex);
			projects.addAll(this.filterProjects(response.getProjects()));
		}

		return projects;
	}

	private ProjectResponse getProjects(int startAt) {
		URI uri = UriComponentsBuilder
				.fromHttpUrl(projectUri)
				.queryParam("maxResults", Config.MAX_RESULTS)
				.queryParam("startAt", startAt)
				.build().encode().toUri();

		logger.info("Requesting projects starting at " + startAt);

		ProjectResponse unfilteredProjects = restTemplate.getForObject(uri, ProjectResponse.class);

		return unfilteredProjects;
	}

	private List<Project> filterProjects(List<Project> projects) {
		List<Project> filteredProjects = new ArrayList<>();

		for(Project project : projects) {
			if(!project.getFolder() && project.getKey() != null) {
				filteredProjects.add(project);
			}
		}

		return filteredProjects;
	}
}
