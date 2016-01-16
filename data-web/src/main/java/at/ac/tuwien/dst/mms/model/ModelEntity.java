package at.ac.tuwien.dst.mms.model;

import at.ac.tuwien.dst.mms.util.Config;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.template.Neo4jOperations;

import java.util.Map;

/**
 * Created by xlin on 15.01.2016.
 */
@NodeEntity
public abstract class ModelEntity {

	@JsonIgnore
	@GraphId
	private Long id;

	@JsonIgnore
	@Query(value = "START n=node({self}) MATCH (n)-[]-(neighbor) RETURN neighbor")
	protected Iterable<Map<String, Object>> neighbors;

	//TODO find out how to specify limit dynamically
	@JsonIgnore
	@Query(value = "START n=node({self}) MATCH (n)-[r]->(neighbor) RETURN neighbor LIMIT " + Config.SEARCH_LIMIT)
	private Iterable<Map<String, Object>> limitedNeighbors;

	@JsonIgnore
	@Autowired
	private Neo4jOperations neo4jOperations;

	public Long getId() {
		return id;
	}

	public Iterable<Map<String, Object>> getNeighbors() {
		return neighbors;
	}
}
