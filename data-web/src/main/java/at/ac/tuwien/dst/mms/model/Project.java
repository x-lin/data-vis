package at.ac.tuwien.dst.mms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.neo4j.graphdb.Direction;
import org.springframework.data.neo4j.annotation.GraphProperty;
import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.annotation.RelatedTo;
import org.springframework.data.neo4j.support.index.IndexType;

import java.util.Set;

/**
 * Entity representing a project.
 */
public class Project extends ModelEntity {
	public static final String PROJECT_KEY_INDEX = "projectKeyIndex";

	@GraphProperty
	@Indexed(unique = true, indexName=PROJECT_KEY_INDEX, indexType = IndexType.FULLTEXT)
	private String key;

	@GraphProperty
	private String name;

	@JsonIgnore
	@RelatedTo(type = "PROJECT", direction = Direction.INCOMING)
	private Set<Issue> issues;

	public Project() {
	}

	@JsonIgnore
	public String getKey() {
		return key;
	}

	@JsonIgnore
	public void setKey(String key) {
		this.key = key;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<Issue> getIssues() {
		return issues;
	}

	public void setIssues(Set<Issue> issues) {
		this.issues = issues;
	}
}
