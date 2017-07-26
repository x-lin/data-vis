package at.ac.tuwien.dst.mms.jira.rest.model;

import java.io.Serializable;

/**
 * Created by XLin on 09.03.2016.
 */
public class JiraUser implements Serializable {
	private String key;

	private String name;

	public String getKey() {
		return key;
	}

	public String getName() {
		return name;
	}

	@Override
	public String toString() {
		return "JiraUser{" +
				"key='" + key + '\'' +
				", name='" + name + '\'' +
				'}';
	}
}
