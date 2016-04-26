package at.ac.tuwien.dst.mms.jama.rest;

import at.ac.tuwien.dst.mms.jama.model.Activity;
import at.ac.tuwien.dst.mms.jama.model.ObjectType;
import at.ac.tuwien.dst.mms.jama.rest.model.ActivityResponse;
import at.ac.tuwien.dst.mms.jama.util.Config;
import at.ac.tuwien.dst.mms.jama.util.DateConverter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by XLin on 21.04.2016.
 */
@Service
public class JamaActivitiesExtractor {
	@Autowired
	private RestTemplate restTemplate;

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	private String activitiesUri = Config.HOST + "/activities";

	private List<Activity> cleanse(List<Activity> activities) {
		List<Activity> cleansedAct = new ArrayList<>();

		for(Activity activity : activities) {
			boolean exists = false;

			if(activity.getItemId() != null) {
				for(Activity cleansed : cleansedAct) {
					boolean same = activity.getItemId().equals(cleansed.getItemId());
					if(same) {
						exists = true;

						boolean rel = (activity.getObjectType() == ObjectType.RELATIONSHIP) && (cleansed.getObjectType() == ObjectType.ITEM);

						if(rel) {
							cleansed.setObjectType(ObjectType.RELATIONSHIP);
							cleansed.setDate(activity.getDate());
						}

						break;
					}
				}

				if(!exists) {
					cleansedAct.add(activity);
				}
			}
		}

		return cleansedAct;
	}

	public List<Activity> getAllItemsForProject(Long id, Date dateFrom, Date dateTo) {
		List<Activity> activities = new ArrayList<>();

		ActivityResponse initialResponse = this.getActivitiesForProject(id, 0, dateFrom, dateTo);

		activities.addAll(initialResponse.getActivities());

		int resultCount = initialResponse.getPageInfo().getResultCount();
		int totalResults = initialResponse.getPageInfo().getTotalResults();
		int startIndex = initialResponse.getPageInfo().getStartIndex();

		while(startIndex + resultCount < totalResults) {

			startIndex += resultCount;
			ActivityResponse response = this.getActivitiesForProject(id, startIndex, dateFrom, dateTo);
			if(response.getActivities() != null) {
				activities.addAll(response.getActivities());
			}
		}

		return cleanse(activities);
	}

	public ActivityResponse getActivitiesForProject(Long projectId, Integer startAt, Date dateFrom, Date dateTo) {

		UriComponentsBuilder builder = UriComponentsBuilder
				.fromHttpUrl(activitiesUri)
				.queryParam("maxResults", Config.MAX_RESULTS)
				.queryParam("project", projectId)
				.queryParam("startAt", startAt)
				.queryParam("objectType", ObjectType.ITEM)
				.queryParam("objectType", ObjectType.RELATIONSHIP);

		if (dateTo != null) {
			builder.queryParam("date", DateConverter.dateToString(dateTo));
		}

		if(dateFrom != null) {
			builder.queryParam("date", DateConverter.dateToString(dateFrom));
		}

		URI uri = builder.build().encode().toUri();

		logger.info("Requesting activities for project " + projectId + " starting at " + startAt);

		return restTemplate.getForObject(uri, ActivityResponse.class);
	}
}
