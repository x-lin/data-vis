package at.ac.tuwien.dst.mms.dal.jama.dto;

import java.util.Date;

/**
 * Created by XLin on 28.04.2016.
 */
public class JamaActivityDTO {
	private Long item;

	private Date date;

	private EventType eventType;

	private ObjectType objectType;

	public Long getItem() {
		return item;
	}

	public Date getDate() {
		return date;
	}

	public EventType getEventType() {
		return eventType;
	}

	public ObjectType getObjectType() {
		return objectType;
	}

	@Override
	public String toString() {
		return "JamaActivityDTO{" +
				"item=" + item +
				", date=" + date +
				", eventType=" + eventType +
				", objectType=" + objectType +
				'}';
	}
}
