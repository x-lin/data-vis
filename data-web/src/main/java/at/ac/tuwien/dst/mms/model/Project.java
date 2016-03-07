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

	@JsonIgnore
	@RelatedTo(type = "PROJECT", direction = Direction.INCOMING)
	private Set<Issue> issues;

	@GraphProperty
	private Integer jamaId;

//	@JsonIgnore
//	@Fetch
//	@RelatedTo(type = "PARENT", direction = Direction.INCOMING)
//	private Project parent;
//
//	@JsonIgnore
//	@Fetch
//	@RelatedTo(type = "PARENT", direction = Direction.OUTGOING)
//	private Set<Project> children;
//
	@Transient
	private Integer jamaParentId;

//	public Integer getJamaParentId() {
//		return jamaParentId;
//	}

//	public Project getParent() {
//		return this.parent;
//	}
//
//	public void setParent(Project parent) {
//		this.parent = parent;
//	}
//
//	public Set<Project> getChildren() {
//		return this.children;
//	}
//
//	public void setChildren(Set<Project> children) {
//		this.children = children;
//	}
//
//	public void addChildren(Project child) {
//		if(this.children == null) {
//			this.children = new HashSet<>();
//		}
//
//		this.children.add(child);
//	}

	@JsonIgnore
	public Integer getJamaParentId() {
		return this.jamaParentId;
	}

	@JsonProperty
	public void setJamaParentId(Integer jamaParentId) {
		this.jamaParentId = jamaParentId;
	}

	public Integer getJamaId() {
		return jamaId;
	}

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

	public Set<Issue> getIssues() {
		return issues;
	}

	public void setIssues(Set<Issue> issues) {
		this.issues = issues;
	}
}
