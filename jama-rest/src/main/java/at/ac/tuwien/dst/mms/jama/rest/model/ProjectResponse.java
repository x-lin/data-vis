package at.ac.tuwien.dst.mms.jama.rest.model;

import at.ac.tuwien.dst.mms.jama.model.Project;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * Created by XLin on 03.03.2016.
 */
public class ProjectResponse {
	@JsonProperty("data")
	List<Project> projects;

	@JsonProperty
	Meta meta;

	public List<Project> getProjects() {
		return projects;
	}

	public void setProjects(List<Project> projects) {
		this.projects = projects;
	}

	public PageInfo getPageInfo() {
		return meta.getPageInfo();
	}

	@Override
	public String toString() {
		return "ProjectResponse{" +
				"projects=" + projects +
				", pageInfo=" + meta.getPageInfo() +
				'}';
	}
}
