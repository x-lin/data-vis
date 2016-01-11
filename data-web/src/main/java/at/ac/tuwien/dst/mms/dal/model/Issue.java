package at.ac.tuwien.dst.mms.dal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.neo4j.graphdb.Direction;
import org.springframework.data.neo4j.annotation.*;
import org.springframework.data.neo4j.support.index.IndexType;

/**
 * Entity representing an issue.
 */
@NodeEntity
public class Issue {
	@GraphId
	@JsonIgnore
	private Long id;

	//TODO remove this field, as it is not needed
	@GraphProperty
	@JsonProperty("id") //for JSON deserialization
	private Long issueId;

	@GraphProperty
	@Indexed(unique = true)
	private String key;

	@GraphProperty
	private String self;

	@RelatedTo(type = "PROJECT", direction = Direction.OUTGOING)
	@Fetch
	@JsonIgnore
	private Project project;

	public Issue() {
	}

	public Issue(String key) {
		this.setKey(key);
	}

	public Long getId() {
		return id;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getSelf() {
		return self;
	}

	public void setSelf(String self) {
		this.self = self;
	}

	@JsonIgnore
	public Project getProject() {
		return project;
	}

	@JsonProperty("project")
	public void setProject(Project project) {
		this.project = project;
	}
}
