package at.ac.tuwien.dst.mms.dal.jira.model;

/**
 * Created by XLin on 10.03.2016.
 */
public class JiraIssueDTO {
	private String key;

	private String self;

	private Long created;

	private JiraProjectDTO project;

	private JiraUserDTO user;

	public String getKey() {
		return key;
	}

	public String getSelf() {
		return self;
	}

	public Long getCreated() {
		return created;
	}

	public JiraProjectDTO getProject() {
		return project;
	}

	public JiraUserDTO getUser() {
		return user;
	}

	@Override
	public String toString() {
		return "JiraIssueDTO{" +
				"key='" + key + '\'' +
				", self='" + self + '\'' +
				", created=" + created +
				", project=" + project +
				", user=" + user +
				'}';
	}
}
