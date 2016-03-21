package at.ac.tuwien.dst.mms.jama.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

/**
 * Created by XLin on 04.03.2016.
 */
public class ItemType implements Serializable {
	Integer jamaId;

	String key;

	String name;

	@JsonProperty("jamaId")
	public Integer getJamaId() {
		return jamaId;
	}

	@JsonProperty("id")
	public void setJamaId(Integer jamaId) {
		this.jamaId = jamaId;
	}

	@JsonProperty("key")
	public String getKey() {
		return key;
	}

	@JsonProperty("typeKey")
	public void setKey(String key) {
		this.key = key;
	}

	@JsonProperty("name")
	public String getName() {
		return name;
	}

	@JsonProperty("display")
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
