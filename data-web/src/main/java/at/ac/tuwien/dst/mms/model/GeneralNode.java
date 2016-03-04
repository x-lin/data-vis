package at.ac.tuwien.dst.mms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.neo4j.graphdb.Direction;
import org.springframework.data.annotation.Transient;
import org.springframework.data.neo4j.annotation.*;
import org.springframework.data.neo4j.support.index.IndexType;

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

	@Transient
	private Integer projectId;

	@Fetch
	@RelatedTo(type = "NODE_TYPE", direction = Direction.OUTGOING)
	private GeneralNodeType type;

	@JsonIgnore
	public GeneralNodeType getType() {
		return type;
	}

	@JsonProperty("type")
	public String getTypeKey() {
		return type.getKey();
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

	@JsonIgnore
	public Integer getProjectId() {
		return this.projectId;
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
