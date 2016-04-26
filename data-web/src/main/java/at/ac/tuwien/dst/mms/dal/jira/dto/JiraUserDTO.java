package at.ac.tuwien.dst.mms.dal.jira.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by XLin on 10.03.2016.
 */
public class JiraUserDTO {
	@JsonProperty("name")
	private String key;

	@JsonProperty("displayName")
	private String name;

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
		return "JiraUserDTO{" +
				"key='" + key + '\'' +
				", name='" + name + '\'' +
				'}';
	}
}
