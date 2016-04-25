package at.ac.tuwien.dst.mms.jama.rest;

import at.ac.tuwien.dst.mms.jama.model.*;
import at.ac.tuwien.dst.mms.jama.rest.model.RelationshipResponse;
import at.ac.tuwien.dst.mms.jama.serialize.ItemSerializer;
import at.ac.tuwien.dst.mms.jama.serialize.RelationshipSerializer;
import com.fasterxml.jackson.annotation.JsonProperty;
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

    @Autowired
    JamaActivitiesExtractor activitiesExtractor;

    @Autowired
    ItemSerializer itemSerializer;

    @Autowired
    RelationshipSerializer relationshipSerializer;

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
        //List<Item> items = itemExtractor.getAllItemsForProject(projectId);

        //this.writeItems(items);

        boolean isWebhook = (webhook != null && webhook.length() > 0);

        List<Item> pvcsb = this.getForFile("items_pvcsb.txt");
        List<Item> pvcsc = this.getForFile("items_pvcsc.txt");

        if(isWebhook) {
            restTemplate.postForEntity(webhook, pvcsb, Object.class);
            restTemplate.postForEntity(webhook, pvcsc, Object.class);
            return new ArrayList<>();
        } else {
            return pvcsb;
        }
    }

    private List<Item> getForFile(String filename) {
        List<Item> items = itemSerializer.read(filename);

        List<Item> filteredItems = new ArrayList<>();

        for(Item item : items) {
            if(item.getStatus() == null ||
                    (item.getStatus() != null && !item.getStatus().equals("Deleted") && !item.getStatus().equals("Rejected"))) {
                filteredItems.add(item);

                if(item.getItemType().getKey().equals("FEAT") && (item.getKey().contains("-WP-") || item.getName().trim().startsWith("[WP]"))) {
                    logger.info("is work package");
                    item.setItemType(-1);
                }

                //this.extractRelationships(item);
            }
        }

        return filteredItems;
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

        List<Relationship> relationships = relationshipSerializer.read("relationships.txt");

        boolean isWebhook = (webhook != null && webhook.length() > 0);

        if(isWebhook) {

            restTemplate.postForEntity(webhook, relationships, Object.class);

            return new ArrayList<>();
        } else {
            return relationships;
        }
    }

    @RequestMapping(value = "/activities", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    List<Activity> getActivities(
            @RequestParam("project") Long projectId,
            @RequestParam(value="webhook", required=false) String webhook
    ) {

        List<Activity> activities = activitiesExtractor.getAllItemsForProject(projectId);

        boolean isWebhook = (webhook != null && webhook.length() > 0);

        if(isWebhook) {

            restTemplate.postForEntity(webhook, activities, Object.class);

            return new ArrayList<>();
        } else {
            return activities;
        }
    }

    private class Stats {
        @JsonProperty
        private int itemsCount;

        @JsonProperty
        private int relCount;

        @JsonProperty
        private String projectName;

        public int getItemsCount() {
            return itemsCount;
        }

        public void setItemsCount(int itemsCount) {
            this.itemsCount = itemsCount;
        }

        public int getRelCount() {
            return relCount;
        }

        public void setRelCount(int relCount) {
            this.relCount = relCount;
        }

        public String getProjectName() {
            return projectName;
        }

        public void setProjectName(String projectName) {
            this.projectName = projectName;
        }

        @Override
        public String toString() {
            return "Stats{" +
                    "itemsCount=" + itemsCount +
                    ", relCount=" + relCount +
                    ", projectName='" + projectName + '\'' +
                    '}';
        }
    }

    @RequestMapping(value = "/map", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    List<Stats> getAllItemsForActivities() {
        long start = System.nanoTime();

        List<Project> projects = this.getAllProjects();
        List<Stats> allStats = new ArrayList<>();

        for(Project project : projects) {
            List<Activity> activities = getActivities(project.getJamaId(), null);
            List<Item> items = new ArrayList<>();
            List<Relationship> relationships = new ArrayList<>();

            for(Activity activity : activities) {
                Item item = itemExtractor.getItem(activity.getItemId());

                if(item != null) {
                    items.add(item);

                    if(activity.getObjectType() == ObjectType.RELATIONSHIP) {
                        List<Relationship> downstream = relationshipExtractor.getRelationshipsForItem(activity.getItemId()).getRelationships();
                        List<Relationship> upstream = relationshipExtractor.getUpstreamRelationshipsForItem(activity.getItemId()).getRelationships();

                        if(downstream != null && downstream.size() > 0) {
                            relationships.addAll(downstream);
                        }

                        if(upstream != null && upstream.size() > 0) {
                            relationships.addAll(upstream);
                        }
                    }
                }
            }

            Stats stats = new Stats();
            stats.setProjectName(project.getKey());
            stats.setItemsCount(items.size());
            stats.setRelCount(relationships.size());
            logger.info("stats: " + stats.toString());

            allStats.add(stats);
        }

        logger.info("Finished requesting all data in " + (System.nanoTime() - start)/1000000000.0 + "s.");

        return allStats;
    }
}
