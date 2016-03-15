package at.ac.tuwien.dst.mms.dal.jira.model;

import at.ac.tuwien.dst.mms.model.Issue;

import java.util.List;

/**
 * Created by XLin on 10.03.2016.
 */
public class JiraUserDTO {
	private String name;

	private List<Issue> issues;

	public String getName() {
		return name;
	}

	public List<Issue> getIssues() {
		return issues;
	}
}
