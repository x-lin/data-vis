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

	private String jiraId;

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
	@RelatedTo(type = "PARENT", direction = Direction.INCOMING)
	private GeneralNode parent;

	@JsonIgnore
	@RelatedTo(type = "PARENT", direction = Direction.OUTGOING)
	private Set<GeneralNode> children;

	@JsonIgnore
	@RelatedTo(type = "DOWNSTREAM", direction = Direction.OUTGOING)
	private Set<GeneralNode> downstream;

	@JsonIgnore
	@RelatedTo(type = "UNCLASSIFIED", direction = Direction.BOTH)
	private Set<GeneralNode> unclassified;

	@JsonIgnore
	@RelatedTo(type = "TEXT_INDEX", direction = Direction.OUTGOING)
	private Set<TextIndex> textIndex;

	private String jiraStatus;

	@GraphProperty
	@JsonProperty
	private String status;

	public GeneralNode() {}

	public GeneralNode(String key, String name) {
		this.key = key;
		this.name = name;
	}

	public void setJamaId(Long jamaId) {
		this.jamaId = jamaId;
	}

	public void setJamaParentId(Long jamaParentId) {
		this.jamaParentId = jamaParentId;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getStatus() {
		return status;
	}

	public Set<TextIndex> getTextIndex() {
		return textIndex;
	}

	public void setTextIndex(Set<TextIndex> textIndex) {
		this.textIndex = textIndex;
	}

	public String getName() {
		return this.name;
	}

	public void setJiraStatus(String jiraStatus) {
		this.jiraStatus = jiraStatus;
	}

	public String getJiraId() {
		return jiraId;
	}

	public void setJiraId(String jiraId) {
		this.jiraId = jiraId;
	}

	public Set<GeneralNode> getUnclassified() {
		return unclassified;
	}

	public void setUnclassified(Set<GeneralNode> unclassified) {
		this.unclassified = unclassified;
	}

	public void addUnclassified(GeneralNode node) {
		this.unclassified.add(node);
	}

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
