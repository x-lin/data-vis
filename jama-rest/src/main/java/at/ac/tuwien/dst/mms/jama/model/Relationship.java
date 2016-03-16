package at.ac.tuwien.dst.mms.jama.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by XLin on 07.03.2016.
 */
public class Relationship {
//	private Long jamaId;

	private Long fromItem;

	private Long toItem;

//	private Integer relationshipType;

	public Relationship() {}

	public Relationship(Long fromItem, Long toItem) {
		this.fromItem = fromItem;
		this.toItem = toItem;
	}

	@JsonProperty("from")
	public Long getFromItem() {
		return fromItem;
	}

	@JsonProperty("fromItem")
	public void setFromItem(Long fromItem) {
		this.fromItem = fromItem;
	}

	@JsonProperty("to")
	public Long getToItem() {
		return toItem;
	}

	@JsonProperty("toItem")
	public void setToItem(Long toItem) {
		this.toItem = toItem;
	}
//
//	@JsonIgnore
//	public Integer getRelationshipType() {
//		return relationshipType;
//	}
//
//	@JsonProperty
//	public void setRelationshipType(Integer relationshipType) {
//		this.relationshipType = relationshipType;
//	}
}
