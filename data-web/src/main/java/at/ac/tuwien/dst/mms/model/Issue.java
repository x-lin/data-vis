package at.ac.tuwien.dst.mms.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.neo4j.graphdb.Direction;
import org.springframework.data.neo4j.annotation.*;
import org.springframework.data.neo4j.support.index.IndexType;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Entity representing an issue.
 */
@NodeEntity
public class Issue {
	@GraphId
	@JsonIgnore
	private Long id;

	@GraphProperty
	@Indexed(unique = true, indexName="issueKeyIndex", indexType = IndexType.FULLTEXT)
	private String key;

	@GraphProperty
	private String self;

	@GraphProperty
	private Long created;

	@RelatedTo(type = "PROJECT", direction = Direction.OUTGOING)
	@Fetch
	private Project project;

	@JsonProperty("reporter")
	@RelatedTo(type = "REPORTER", direction = Direction.OUTGOING)
	@Fetch
	private User user;

	@RelatedTo(type = "REQUIREMENT", direction = Direction.OUTGOING)
	private @Fetch Set<Requirement> requirements;

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

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	//fetches the "created" field; we have to extract it that way, because the JRJC stores dates in
	//org.joda.time.DateTime format
	@JsonProperty("creationDate")
	public void setCreated(Map<String, Object> creationDate) {
		created = (Long) creationDate.get("millis");
	}

	public Set<Requirement> getRequirements() {
		return requirements;
	}

	public void setRequirements(Set<Requirement> requirements) {
		this.requirements = requirements;
	}

	public void addRequirement(Requirement req) {
		this.requirements.add(req);
	}
}
