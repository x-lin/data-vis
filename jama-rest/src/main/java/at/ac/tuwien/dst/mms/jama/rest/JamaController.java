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

        List<Item> filteredItems = new ArrayList<>();

        for(Item item : items) {
            if(item.getStatus() != null && !item.getStatus().equals("Deleted") && !item.getStatus().equals("Rejected")) {
                filteredItems.add(item);
                this.extractRelationships(item);
            }
        }

        boolean isWebhook = (webhook != null && webhook.length() > 0);

        if(isWebhook) {
            restTemplate.postForEntity(webhook, filteredItems, Object.class);
            return new ArrayList<>();
        } else {
            return items;
        }
    }

    private void extractRelationships(Item item) {
        System.out.println(item.getItemType());

        if(item.getItemType() != null && !item.getItemType().getKey().equals("FLD") && !item.getItemType().getKey().equals("SET")) {
            RelationshipResponse initialResponse = relationshipExtractor.getRelationshipsForItem(item.getJamaId());

            if(initialResponse != null && initialResponse.getRelationships() != null) {
                RelationshipsTempStorage.get().add(initialResponse.getRelationships());
            }
        } else {
            logger.info("Folder or Set detected, not extracting.");
        }
    }

    @RequestMapping(value = "/relationships", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    List<Relationship> getRelationships(
            @RequestParam("project") Integer projectId,
            @RequestParam(value="webhook", required=false) String webhook
    ) {
        boolean isWebhook = (webhook != null && webhook.length() > 0);

        if(isWebhook) {

            restTemplate.postForEntity(webhook, RelationshipsTempStorage.get().getAll(), Object.class);

            return new ArrayList<>();
        } else {
            return relationshipExtractor.getAllRelationshipsForProject(projectId);
        }
    }
}
