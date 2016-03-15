package at.ac.tuwien.dst.mms.dal.jira.model;

/**
 * Created by XLin on 10.03.2016.
 */
public class JiraProjectDTO {
	private long id;

	private String key;

	private String name;

	private String self;

	public long getId() {
		return id;
	}

	public String getKey() {
		return key;
	}

	public String getName() {
		return name;
	}

	public String getSelf() {
		return self;
	}

	@Override
	public String toString() {
		return "JiraProjectDTO{" +
				"id=" + id +
				", key='" + key + '\'' +
				", name='" + name + '\'' +
				", self='" + self + '\'' +
				'}';
	}
}
