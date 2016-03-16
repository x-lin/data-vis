package at.ac.tuwien.dst.mms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.neo4j.graphdb.Direction;
import org.springframework.data.annotation.Transient;
import org.springframework.data.neo4j.annotation.*;
import org.springframework.data.neo4j.support.index.IndexType;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by XLin on 04.03.2016.
 */
@NodeEntity
public class GeneralNode extends ModelEntity {
	public static final String GENERAL_NODE_KEY_INDEX = "generalNodeKeyIndex";

	@JsonIgnore
	@GraphId
	private Long id;

	@RelatedTo(type = "PROJECT", direction = Direction.INCOMING)
	@Fetch
	@JsonIgnore
	private Project project;

	@GraphProperty
	@JsonProperty
	private Long jamaId;

	@GraphProperty
	@JsonProperty
	private Long jamaParentId;

	@GraphProperty
	@Indexed(unique = true, indexName=GENERAL_NODE_KEY_INDEX, indexType = IndexType.FULLTEXT, failOnDuplicate = true)
	@JsonProperty
	private String key;

	@GraphProperty
	@JsonProperty
	private String name;

	@Transient
	private Integer projectId;

	@RelatedTo(type = "NODE_TYPE", direction = Direction.OUTGOING)
	@Fetch
	private GeneralNodeType type;

	@JsonIgnore
	//@Fetch
	@RelatedTo(type = "PARENT", direction = Direction.INCOMING)
	private GeneralNode parent;

	@JsonIgnore
	//@Fetch
	@RelatedTo(type = "PARENT", direction = Direction.OUTGOING)
	private Set<GeneralNode> children;

	@JsonIgnore
	//@Fetch
	@RelatedTo(type = "DOWNSTREAM", direction = Direction.INCOMING)
	private Set<GeneralNode> downstream;

	@GraphProperty
	@JsonProperty
	private String status;

	public Set<GeneralNode> getDownstream() {
		return downstream;
	}

	public void setDownstream(Set<GeneralNode> downstream) {
		this.downstream = downstream;
	}

	public void addDownstream(Set<GeneralNode> downstream) {
		if(this.downstream == null) {
			this.downstream = new HashSet<>();
		}

		this.downstream.addAll(downstream);
	}

	public void addDownstream(GeneralNode downstream) {
		if(this.downstream == null) {
			this.downstream = new HashSet<>();
		}

		this.downstream.add(downstream);
	}

	public GeneralNode getParent() {
		return this.parent;
	}

	public void setParent(GeneralNode parent) {
		this.parent = parent;
	}

	public Set<GeneralNode> getChildren() {
		return this.children;
	}

	public void setChildren(Set<GeneralNode> children) {
		this.children = children;
	}

	public void addChildren(GeneralNode child) {
		if(this.children == null) {
			this.children = new HashSet<>();
		}

		this.children.add(child);
	}

	@JsonProperty("type")
	public void setType(GeneralNodeType type) {
		this.type = type;
	}

	@JsonIgnore
	public GeneralNodeType getType() {
		return type;
	}

	@JsonProperty("type")
	public String getTypeKey() {
		return type.getName();
	}

	public String getKey() {
		return key;
	}

	public Long getJamaParentId() {
		return jamaParentId;
	}

	public Long getJamaId() {
		return jamaId;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	@JsonProperty
	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}

	@JsonProperty
	public Integer getProjectId() {
		if(this.project == null) {
			return this.projectId;
		} else {
			return this.project.getJamaId();
		}
	}

	@Override
	public String toString() {
		return "GeneralNode{" +
				"id=" + id +
				", project=" + project +
				", jamaId=" + jamaId +
				", jamaParentId=" + jamaParentId +
				", key='" + key + '\'' +
				", projectId=" + projectId +
				", type=" + type +
				'}';
	}
}
