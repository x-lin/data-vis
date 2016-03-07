package at.ac.tuwien.dst.mms.jama.rest;

import at.ac.tuwien.dst.mms.jama.model.Item;
import at.ac.tuwien.dst.mms.jama.model.Project;
import at.ac.tuwien.dst.mms.jama.model.Relationship;
import at.ac.tuwien.dst.mms.jama.rest.model.RelationshipResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by XLin on 02.03.2016.
 */
@RestController
public class JamaController {
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    JameProjectExtractor projectExtractor;

    @Autowired
    JamaItemExtractor itemExtractor;

    @Autowired
    JamaRelationshipExtractor relationshipExtractor;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "/projects", method= RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    List<Project> getAllProjects(
//            @RequestParam("webhook") String webhook
    ) {
        return projectExtractor.getAllProjects();
    }

    @RequestMapping(value = "/items", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    List<Item> getItems(
            @RequestParam("project") Integer projectId,
            @RequestParam(value="webhook", required=false) String webhook
    ) {
        List<Item> items = itemExtractor.getAllItemsForProject(projectId);

        boolean isWebhook = (webhook != null && webhook.length() > 0);

        if(isWebhook) {
            restTemplate.postForEntity(webhook, items, Object.class);
            return new ArrayList<>();
        } else {
            return items;
        }
    }

    @RequestMapping(value = "/relationships", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    List<Relationship> getRelationships(
            @RequestParam("project") Integer projectId,
            @RequestParam(value="webhook", required=false) String webhook
    ) {
//        List<Relationship> relationships = relationshipExtractor.getAllRelationshipsForProject(projectId);

        boolean isWebhook = (webhook != null && webhook.length() > 0);

        if(isWebhook) {
            RelationshipResponse initialResponse = relationshipExtractor.getRelationshipsForProject(projectId, 0);

            if(initialResponse != null && initialResponse.getRelationships() != null) {
                restTemplate.postForEntity(webhook, initialResponse.getRelationships(), Object.class);

                int resultCount = initialResponse.getPageInfo().getResultCount();
                int totalResults = initialResponse.getPageInfo().getTotalResults();
                int startIndex = initialResponse.getPageInfo().getStartIndex();

                while(startIndex + resultCount < totalResults) {

                    startIndex += resultCount;
                    RelationshipResponse response =
                            relationshipExtractor.getRelationshipsForProject(projectId, startIndex);

                    if(response.getRelationships() != null) {
                        restTemplate.postForEntity(webhook, response.getRelationships(), Object.class);
                    }
                }
            }
            return new ArrayList<>();
        } else {
            return relationshipExtractor.getAllRelationshipsForProject(projectId);
        }
    }
}
