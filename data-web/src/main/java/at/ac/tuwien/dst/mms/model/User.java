package at.ac.tuwien.dst.mms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.neo4j.annotation.*;
import org.springframework.data.neo4j.support.index.IndexType;

/**
 * Created by xlin on 14.01.2016.
 */
@NodeEntity
public class User {
	@GraphId
	@JsonIgnore
	private Long id;

	@GraphProperty
	@Indexed(unique = true, indexName="usernameIndex", indexType = IndexType.FULLTEXT)
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public User() {

	}
}
