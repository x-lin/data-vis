package at.ac.tuwien.dst.mms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.GraphProperty;
import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.support.index.IndexType;

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

	public GeneralNodeType(){}

	public GeneralNodeType(String key, String name) {
		this.key = key;
		this.name = name;
	}

	public Integer getJamaId() {
		return jamaId;
	}

	public String getKey() {
		return key;
	}

	public String getName() {
		return name;
	}

	public void setJamaId(Integer jamaId) {
		this.jamaId = jamaId;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public void setName(String name) {
		this.name = name;
	}
}
