package at.ac.tuwien.dst.mms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.neo4j.graphdb.Direction;
import org.springframework.data.annotation.Transient;
import org.springframework.data.neo4j.annotation.*;
import org.springframework.data.neo4j.support.index.IndexType;

import java.util.Set;

/**
 * Entity representing a project.
 */
@NodeEntity
public class Project extends ModelEntity {
	public static final String PROJECT_KEY_INDEX = "projectKeyIndex";

	@JsonIgnore
	@GraphId
	private Long id;

	@GraphProperty
	@Indexed(unique = true, indexName=PROJECT_KEY_INDEX, indexType = IndexType.FULLTEXT, failOnDuplicate = true)
	private String key;

	@GraphProperty
	private String name;

	@GraphProperty
	private Integer jamaId;

	@Transient
	private Integer jamaParentId;

	@JsonIgnore
	//@Fetch
	@RelatedTo(type = "TEXT_INDEX", direction = Direction.OUTGOING)
	private Set<TextIndex> textIndex;

	@JsonIgnore
	public Integer getJamaParentId() {
		return this.jamaParentId;
	}

	@JsonProperty
	public void setJamaParentId(Integer jamaParentId) {
		this.jamaParentId = jamaParentId;
	}

	@JsonProperty
	public Integer getJamaId() {
		return jamaId;
	}

	@JsonProperty
	public void setJamaId(Integer jamaId) {
		this.jamaId = jamaId;
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

	@JsonProperty
	public String getType() {
		return "Project";
	}

	public void setTextIndex(Set<TextIndex> textIndex) {
		this.textIndex = textIndex;
	}
}
