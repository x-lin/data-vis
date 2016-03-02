package at.ac.tuwien.dst.mms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.neo4j.graphdb.Direction;
import org.springframework.data.neo4j.annotation.*;
import org.springframework.data.neo4j.support.index.IndexType;

import java.util.List;

/**
 * Created by xlin on 14.01.2016.
 */
@NodeEntity
public class User extends ModelEntity {
	public static final String USER_NAME_INDEX = "usernameIndex";

	@JsonIgnore
	@GraphId
	private Long id;

	@GraphProperty
	@Indexed(unique = true, indexName=USER_NAME_INDEX, indexType = IndexType.FULLTEXT)
	private String name;

	@JsonIgnore
	@RelatedTo(type = "REPORTER", direction = Direction.INCOMING)
	private List<Issue> issues;

	public User() {
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Issue> getIssues() {
		return issues;
	}

	public void setIssues(List<Issue> issues) {
		this.issues = issues;
	}
}
