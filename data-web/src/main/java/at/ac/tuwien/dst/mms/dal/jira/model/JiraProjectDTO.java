package at.ac.tuwien.dst.mms.dal.jira.model;

/**
 * Created by XLin on 10.03.2016.
 */
public class JiraProjectDTO {
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
		return "JiraProjectDTO{" +
				", key='" + key + '\'' +
				", name='" + name + '\'' +
				'}';
	}
}
