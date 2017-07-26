package at.ac.tuwien.dst.mms.jira.rest.model;

import java.io.Serializable;

/**
 * Created by XLin on 09.03.2016.
 */
public class JiraIssue implements Serializable {
	private String key;

	private String name;

	private JiraUser user;

	public String getKey() {
		return key;
	}

	public String getName() {
		return name;
	}

	public JiraUser getUser() {
		return user;
	}


	@Override
	public String toString() {
		return "JiraIssue{" +
				"key='" + key + '\'' +
				", name='" + name + '\'' +
				", user=" + user +
				'}';
	}
}
