package at.ac.tuwien.dst.mms.jama.rest.model;

import at.ac.tuwien.dst.mms.jama.model.Activity;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * Created by XLin on 21.04.2016.
 */
public class ActivityResponse {
	@JsonProperty("data")
	List<Activity> activities;

	@JsonProperty
	Meta meta;

	public List<Activity> getActivities() {
		return activities;
	}

	public void setActivities(List<Activity> activities) {
		this.activities = activities;
	}

	public PageInfo getPageInfo() {
		return meta.getPageInfo();
	}

	@Override
	public String toString() {
		return "ItemResponse{" +
				"items=" + activities +
				", pageInfo=" + meta.getPageInfo() +
				'}';
	}
}
