package at.ac.tuwien.dst.mms.dal.jira.dto;

/**
 * Created by XLin on 21.03.2016.
 */
public class JiraStatusDTO {
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "JiraStatusDTO{" +
				"name='" + name + '\'' +
				'}';
	}
}
