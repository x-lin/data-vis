package at.ac.tuwien.dst.mms.jama.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by XLin on 04.03.2016.
 */
public class ItemType {
	Integer jamaId;

	@JsonProperty("typeKey")
	String key;

	@JsonProperty("display")
	String name;

	@JsonProperty("jamaId")
	public Integer getJamaId() {
		return jamaId;
	}

	@JsonProperty("id")
	public void setJamaId(Integer jamaId) {
		this.jamaId = jamaId;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "ItemType{" +
				"jamaId=" + jamaId +
				", key='" + key + '\'' +
				", name='" + name + '\'' +
				'}';
	}
}
