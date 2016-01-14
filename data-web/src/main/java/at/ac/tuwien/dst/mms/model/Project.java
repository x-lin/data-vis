package at.ac.tuwien.dst.mms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.org.apache.bcel.internal.generic.RETURN;
import org.springframework.data.neo4j.annotation.*;
import org.springframework.data.neo4j.support.index.IndexType;

/**
 * Entity representing a project.
 */
@NodeEntity
public class Project {
	@GraphId
	@JsonIgnore			//id is only for graph intern representation is therefore ignored on JSON serialization
	private Long id;

	@GraphProperty
	@Indexed(unique = true, indexName="projectKeyIndex", indexType = IndexType.FULLTEXT)
	private String key;

	@GraphProperty
	private String name;

	@GraphProperty
	private String self;

	public Project() {
	}

	public Long getId() {
		return id;
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

	public String getSelf() {
		return self;
	}

	public void setSelf(String self) {
		this.self = self;
	}

//
//	@Override
//	public boolean equals(Object obj) {
//		if(this == obj) {
//			return true;
//		} else if(obj == null) {
//			return false;
//		}
//
//		Project project = (Project) obj;
//		if(project.key.equals(this.key) && project.self.equals(this.self)) {
//			return true;
//		} else {
//			return false;
//		}
//	}
}
