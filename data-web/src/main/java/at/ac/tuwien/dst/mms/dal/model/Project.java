package at.ac.tuwien.dst.mms.dal.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.GraphProperty;
import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.annotation.NodeEntity;

/**
 * Entity representing a project.
 */
@NodeEntity
public class Project {
	@GraphId
	private Long id;

	@GraphProperty
	@JsonProperty("id") //for JSON deserialization
	private
	Integer projectId;

	@GraphProperty
	@Indexed(unique = true)
	private String key;

	@GraphProperty
	private String name;

	@GraphProperty
	private String self;

	public Project() {
	}

	public Long getId() {
		return id;
	}

	public Integer getProjectId() {
		return projectId;
	}

	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}

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

	public String getSelf() {
		return self;
	}

	public void setSelf(String self) {
		this.self = self;
	}

//
//	@Override
//	public boolean equals(Object obj) {
//		if(this == obj) {
//			return true;
//		} else if(obj == null) {
//			return false;
//		}
//
//		Project project = (Project) obj;
//		if(project.key.equals(this.key) && project.self.equals(this.self)) {
//			return true;
//		} else {
//			return false;
//		}
//	}
}
