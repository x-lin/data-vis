package at.ac.tuwien.dst.mms.model;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.GraphProperty;
import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.support.index.IndexType;

import java.util.List;

/**
 * //TODO implement
 * Created by xlin on 08.01.2016.
 */
@NodeEntity
public class Requirement {
	@GraphId
	Long id;

	@GraphProperty
	@Indexed(unique = true, indexName="requirementKeyIndex", indexType = IndexType.FULLTEXT)
	private String key;

	public Requirement() {
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}
}
