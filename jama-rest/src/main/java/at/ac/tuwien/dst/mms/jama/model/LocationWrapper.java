package at.ac.tuwien.dst.mms.jama.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

/**
 * Created by XLin on 04.03.2016.
 */
public class LocationWrapper implements Serializable {
	@JsonProperty("parent")
	private ParentWrapper parent;

	public Long getItem() {
		return parent.getItem();
	}

	@Override
	public String toString() {
		return "LocationWrapper{" +
				"parent=" + parent +
				'}';
	}
}
