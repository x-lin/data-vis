package at.ac.tuwien.dst.mms.jama.rest;

import at.ac.tuwien.dst.mms.jama.model.Project;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by XLin on 02.03.2016.
 */
@RestController
public class JamaController {

    @Autowired
    JameProjectExtractor extractor;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "/projects", method= RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    List<Project> getAllProjects() {
        List<Project> projects = extractor.getAllProjects();

        return projects;
    }

    @RequestMapping(value = "/items", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    List<Object> getItems(
            @RequestParam("project") Integer projectId
    ) {
        return null;
    }
}
