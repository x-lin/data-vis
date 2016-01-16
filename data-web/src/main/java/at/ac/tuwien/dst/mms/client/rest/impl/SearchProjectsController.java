package at.ac.tuwien.dst.mms.client.rest.impl;

import at.ac.tuwien.dst.mms.model.Project;
import at.ac.tuwien.dst.mms.util.Config;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by xlin on 15.01.2016.
 */
@RestController
@RequestMapping(Config.SEARCH_REST_PATH + Config.PROJECTS_PATH)
public class SearchProjectsController extends AbstractSearchController<Project> {
}
