package at.ac.tuwien.dst.mms.dal.jira.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by XLin on 10.03.2016.
 */
public class JiraIssueDTO {
	private String key;

	@JsonProperty("summary")
	private String name;

	private JiraProjectDTO project;

	private JiraUserDTO user;

	private JiraStatusDTO status;

	public String getKey() {
		return key;
	}


	public JiraProjectDTO getProject() {
		return project;
	}

	public JiraUserDTO getUser() {
		return user;
	}

	@JsonProperty("assignee")
	public void setUser(JiraUserDTO user) {
		this.user = user;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getName() {
		return this.name;
	}

	public String getStatus() {
		return status.getName();
	}

	public void setProject(JiraProjectDTO project) {
		this.project = project;
	}
}
