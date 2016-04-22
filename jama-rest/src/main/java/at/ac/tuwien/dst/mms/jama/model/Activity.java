package at.ac.tuwien.dst.mms.jama.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

/**
 * Created by XLin on 21.04.2016.
 */
public class Activity {
	@JsonProperty("item")
	private Long itemId;

	@JsonProperty("date")
	private Date date;

	@JsonProperty("eventType")
	private EventType eventType;

	@JsonProperty("objectType")
	private ObjectType objectType;

	public Long getItemId() {
		return itemId;
	}

	public Date getDate() {
		return date;
	}

	public ObjectType getObjectType() {
		return objectType;
	}

	public void setItemId(Long itemId) {
		this.itemId = itemId;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public void setObjectType(ObjectType objectType) {
		this.objectType = objectType;
	}

	public EventType getEventType() {
		return eventType;
	}

	public void setEventType(EventType eventType) {
		this.eventType = eventType;
	}

	@Override
	public String toString() {
		return "Activity{" +
				"itemId=" + itemId +
				", date=" + date +
				", eventType=" + eventType +
				", objectType=" + objectType +
				'}';
	}
}
