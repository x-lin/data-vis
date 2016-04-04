package at.ac.tuwien.dst.mms.client.rest.impl;

import at.ac.tuwien.dst.mms.dal.ProjectDataReader;
import at.ac.tuwien.dst.mms.dal.query.model.ProjectSchema;
import at.ac.tuwien.dst.mms.model.Project;
import at.ac.tuwien.dst.mms.util.Config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * Created by xlin on 15.01.2016.
 */
@RestController
@RequestMapping(Config.SEARCH_REST_PATH + Config.PROJECTS_PATH)
public class SearchProjectsController extends AbstractSearchController<Project> {
	@Autowired
	ProjectDataReader projectDataReader;

	@RequestMapping(value ="/schema/{projectKey}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ProjectSchema getSchema(
			@PathVariable String projectKey,
			@RequestParam(value="relation", required=false) String relation
	) {
		if(relation != null) {
			return projectDataReader.getSchema(projectKey, relation);
		} else {
			return projectDataReader.getSchema(projectKey);
		}
	}
}
