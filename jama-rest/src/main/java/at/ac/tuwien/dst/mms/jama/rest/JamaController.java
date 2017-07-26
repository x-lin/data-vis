package at.ac.tuwien.dst.mms.jama.rest;

import at.ac.tuwien.dst.mms.jama.model.*;
import at.ac.tuwien.dst.mms.jama.rest.model.ListResponse;
import at.ac.tuwien.dst.mms.jama.serialize.ItemSerializer;
import at.ac.tuwien.dst.mms.jama.serialize.RelationshipSerializer;
import at.ac.tuwien.dst.mms.jama.util.Config;
import com.jamasoftware.services.restclient.exception.RestClientException;
import com.jamasoftware.services.restclient.jamadomain.core.JamaInstance;
import com.jamasoftware.services.restclient.jamadomain.lazyresources.JamaItem;
import com.jamasoftware.services.restclient.jamadomain.lazyresources.JamaProject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 *
 * @author XLin
 */
@RestController
public class JamaController {
    @Autowired
    private RestTemplate restTemplate;

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

    @Autowired
	JamaListExtractor extractor;

    @Autowired
	JamaInstance jamaInstance;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "/projects", method= RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    List<JamaProject> getAllProjects(
//            @RequestParam("webhook") String webhook
    ) throws RestClientException {
		List<JamaProject> projects = jamaInstance.getProjects();
		return projects.stream().filter(p -> !p.isFolder() && p.isProject()).collect(Collectors.toList());
	}

    @RequestMapping(value = "/items", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    List<Item> getItems(
            @RequestParam("project") Integer projectId,
            @RequestParam(value="webhook", required=false) String webhook
    ) {
    	//List<JamaItem> items = jamaInstance.get
        List<Item> items = itemExtractor.getAllItemsForProject(projectId);
		this.getForItems(items);

        boolean isWebhook = (webhook != null && webhook.length() > 0);

        if(isWebhook) {
            //restTemplate.postForEntity(webhook, pvcsb, Object.class);
            restTemplate.postForEntity(webhook, items, Object.class);
            return new ArrayList<>();
        } else {
            return items;
        }
    }

	@RequestMapping(value = "/item/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Item getItem(
			@PathVariable("id") Long id
	) {
		Item item = itemExtractor.getItem(id);

		if(item != null) {
			logger.info("item with id " + item.getJamaId() + " is: " + item.toString());
		}

		return item;
	}

	@RequestMapping(value = "/item/{id}/relationships", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Relationship> getRelationships(
			@PathVariable("id") Long id
	) {
		return relationshipExtractor.getAllRelationshipsForItem(id);
	}

	private List<Item> getForItems(List<Item> items) {
		List<Item> filteredItems = new ArrayList<>();

		for(Item item : items) {
			if(item.getStatus() == null ||
					(item.getStatus() != null && !item.getStatus().equals("Deleted") && !item.getStatus().equals("Rejected"))) {
				filteredItems.add(item);

				if(item.getItemType().getKey().equals("FEAT") && (item.getKey().contains("-WP-") || item.getName().trim().startsWith("[WP]"))) {
					logger.info("is work package");
					item.setItemType(-1);
				}

				this.extractRelationships(item);
			}
		}

		return filteredItems;
	}

    private void extractRelationships(Item item) {
        if(item.getItemType() != null && !item.getItemType().getKey().equals("FLD") && !item.getItemType().getKey().equals("SET")) {
            List<Relationship> initialResponse = relationshipExtractor.getAllRelationshipsForItem(item.getJamaId());
			RelationshipsTempStorage.get().add(initialResponse);
        } else {
            logger.info("Folder or Set detected, not extracting.");
        }
    }

    @RequestMapping(value = "/relationships", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    List<Relationship> getRelationships(
            @RequestParam("project") Integer projectId,
            @RequestParam(value="webhook", required=false) String webhook
    ) {

        //List<Relationship> relationships = relationshipSerializer.read("relationships_pvcsc.txt");
		//List<Relationship> relationships = relationshipSerializer.read("relationships_pvcsb.txt");
		List<Relationship> relationships = RelationshipsTempStorage.get().getAll();

        boolean isWebhook = (webhook != null && webhook.length() > 0);

        if(isWebhook) {

            //restTemplate.postForEntity(webhook, relationships, Object.class);
			restTemplate.postForEntity(webhook, relationships, Object.class);

            return new ArrayList<>();
        } else {
            return relationships;
        }
    }

    @RequestMapping(value = "/activities", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    List<Activity> getActivities(
            @RequestParam("project") Long projectId,
			@RequestParam(value="dateFrom") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date dateFrom,
			@RequestParam(value="dateTo", required=false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date dateTo,
            @RequestParam(value="webhook", required=false) String webhook
    ) {

        List<Activity> activities = activitiesExtractor.getActivities(projectId, dateFrom, dateTo);

        boolean isWebhook = (webhook != null && webhook.length() > 0);

        if(isWebhook) {

            restTemplate.postForEntity(webhook, activities, Object.class);

            return new ArrayList<>();
        } else {
            return activities;
        }
    }

	@Async
	private void add(List<Activity> activities, List<Item> items, List<Relationship> relationships) {
		for (Activity activity : activities) {
			Item item = itemExtractor.getItem(activity.getItemId());

			if (item != null) {
				items.add(item);
				relationships.addAll(relationshipExtractor.getAllRelationshipsForItem(activity.getItemId()));
			}
		}
	}

	@Async
	private void addProjects(Project project, Date dateFrom, Date dateTo, List<Item> items, List<Relationship> relationships) {
		List<Activity> activities = getActivities(project.getJamaId(), dateFrom, dateTo, null);
		this.add(activities, items, relationships);
	}

	@RequestMapping(value = "/update", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	List<Object> getUpdates(
		@RequestParam(value="relWebhook", required=false) String relWebhook,
		@RequestParam(value="itemWebhook", required=false) String itemWebhook,
		@RequestParam(value="dateFrom") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date dateFrom,
		@RequestParam(value="dateTo", required=false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date dateTo,
		@RequestParam(value="project", required=false) List<Long> projectIds
	) throws RestClientException {
    	List<Project> projects = null;
		//List<Project> projects = this.getAllProjects();
		List<Item> items = new ArrayList<>();
		List<Relationship> relationships = new ArrayList<>();

		if (projectIds == null || projectIds.size() == 0) {
			for (Project project : projects) {
				this.addProjects(project, dateFrom, dateTo, items, relationships);
			}
		} else {
			projectIds.forEach(id -> {
				List<Activity> activities = getActivities(id, dateFrom, dateTo, null);
				this.add(activities, items, relationships);
			});
		}

		logger.info("Finished fetching all updates starting from " + dateFrom.toString() + (dateTo != null ? " until " + dateTo.toString() : ""));

		if(relWebhook == null || itemWebhook == null) {
			List<Object> objects = new ArrayList<>();
			objects.addAll(items);
			objects.addAll(relationships);

			return objects;
		} else {
			restTemplate.postForEntity(itemWebhook, items, Object.class);
			restTemplate.postForEntity(relWebhook, relationships, Object.class);

			return null;
		}
	}


}
