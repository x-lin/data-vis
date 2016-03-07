package at.ac.tuwien.dst.mms.jama.rest.model;

import at.ac.tuwien.dst.mms.jama.model.Relationship;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * Created by XLin on 04.03.2016.
 */
public class RelationshipResponse {
	@JsonProperty("data")
	List<Relationship> relationships;

	@JsonProperty
	Meta meta;

	public List<Relationship> getRelationships() {
		return relationships;
	}

	public void setRelationships(List<Relationship> relationships) {
		this.relationships = relationships;
	}

	public PageInfo getPageInfo() {
		return meta.getPageInfo();
	}

	@Override
	public String toString() {
		return "RelationshipResponse{" +
				"relationships=" + relationships +
				", meta=" + meta +
				'}';
	}
}
