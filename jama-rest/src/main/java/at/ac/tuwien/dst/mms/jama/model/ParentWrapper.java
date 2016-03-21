package at.ac.tuwien.dst.mms.jama.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

/**
 * Created by XLin on 04.03.2016.
 */
public class ParentWrapper implements Serializable {
	@JsonProperty("item")
	private Long item;

	public Long getItem() {
		return this.item;
	}

	@Override
	public String toString() {
		return "ParentWrapper{" +
				"item=" + item +
				'}';
	}
}
