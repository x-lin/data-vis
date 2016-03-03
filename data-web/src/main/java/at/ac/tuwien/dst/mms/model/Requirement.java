package at.ac.tuwien.dst.mms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.neo4j.graphdb.Direction;
import org.springframework.data.neo4j.annotation.*;
import org.springframework.data.neo4j.support.index.IndexType;

import java.util.Set;

/**
 *
 * Created by xlin on 08.01.2016.
 */
@NodeEntity
public class Requirement extends ModelEntity {
	public static final String REQUIREMENT_KEY_INDEX = "requirementKeyIndex";

	@JsonIgnore
	@GraphId
	private Long id;

	@JsonProperty("id")
	private Integer jamaId;

	@GraphProperty
	@Indexed(unique = true, indexName=REQUIREMENT_KEY_INDEX, indexType = IndexType.FULLTEXT)
	private String key;

	@JsonIgnore
	@RelatedTo(type = "REQUIREMENT", direction = Direction.INCOMING)
	private	Set<Issue> issues;

	public Requirement() {
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public Integer getJamaId() {
		return this.jamaId;
	}

	public void setJameId(Integer id) {
		this.jamaId = id;
	}

	public Set<Issue> getIssues() {
		return issues;
	}

	public void setIssues(Set<Issue> issues) {
		this.issues = issues;
	}
}
