package at.ac.tuwien.dst.mms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.neo4j.graphdb.Direction;
import org.springframework.data.neo4j.annotation.*;
import org.springframework.data.neo4j.support.index.IndexType;

import java.util.List;

/**
 * Created by XLin on 04.03.2016.
 */
@NodeEntity
public class GeneralNodeType extends ModelEntity {
	public static final String GENERAL_NODE_TYPE_KEY_INDEX = "generalNodeTypeKeyIndex";

	@JsonIgnore
	@GraphId
	private Long id;

	@GraphProperty
	Integer jamaId;

	@GraphProperty
	@Indexed(unique = true, indexName=GENERAL_NODE_TYPE_KEY_INDEX, indexType = IndexType.FULLTEXT, failOnDuplicate = true)
	String key;

	@GraphProperty
	String name;

	@JsonIgnore
	@RelatedTo(type = "NODE_TYPE", direction = Direction.INCOMING)
	List<GeneralNode> nodes;

	public Integer getJamaId() {
		return jamaId;
	}

	public String getKey() {
		return key;
	}

	public String getName() {
		return name;
	}

	public List<GeneralNode> getNodes() {
		return nodes;
	}

	@Override
	public String toString() {
		return "GeneralNodeType{" +
				"id=" + id +
				", jamaId=" + jamaId +
				", key='" + key + '\'' +
				", name='" + name + '\'' +
				", nodes=" + nodes +
				'}';
	}
}
