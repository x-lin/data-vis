package at.ac.tuwien.dst.mms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.neo4j.graphdb.Direction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.annotation.GraphProperty;
import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.annotation.RelatedTo;
import org.springframework.data.neo4j.support.index.IndexType;
import org.springframework.data.neo4j.template.Neo4jOperations;

import java.util.Map;
import java.util.Set;

/**
 * Entity representing an issue.
 */
public class Issue extends ModelEntity {
	public static final String ISSUE_KEY_INDEX = "issueKeyIndex";

	@GraphProperty
	@Indexed(unique = true, indexName="issueKeyIndex", indexType = IndexType.FULLTEXT)
	private String key;

	@JsonIgnore
	@GraphProperty
	private String self;

	//TODO reset property value for next pull
	@JsonProperty("created")
	@GraphProperty
	private Long created;

	@JsonIgnore
	@RelatedTo(type = "PROJECT", direction = Direction.OUTGOING)
	private Project project;

	@JsonIgnore
	@RelatedTo(type = "REPORTER", direction = Direction.OUTGOING)
	private User user;

	@JsonIgnore
	@RelatedTo(type = "REQUIREMENT", direction = Direction.OUTGOING)
	private Set<Requirement> requirements;
//
//	@Query(value = "START n=node({self}) MATCH (n)-[]-(neighbor) RETURN neighbor")
//	protected Iterable<Map<String, Object>> neighbors;

	public Issue() {
	}

	public Issue(String key) {
		this.setKey(key);
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

	@JsonProperty
	public void setProject(Project project) {
		this.project = project;
	}

	@JsonIgnore
	public User getUser() {
		return user;
	}

	@JsonProperty("reporter")
	public void setUser(User user) {
		this.user = user;
	}

	//fetches the "created" field; we have to extract it that way, because the JRJC stores dates in
	//org.joda.time.DateTime format
	@JsonProperty
	public void setCreated(Map<String, Object> creationDate) {
		this.created = (Long) creationDate.get("millis");
	}

	@JsonProperty
	public Long getCreated() {
		return created;
	}

	@JsonIgnore
	public Set<Requirement> getRequirements() {
		return requirements;
	}

	@JsonProperty
	public void setRequirements(Set<Requirement> requirements) {
		this.requirements = requirements;
	}

	@JsonIgnore
	@Autowired
	protected Neo4jOperations neo4jOperations;
}
