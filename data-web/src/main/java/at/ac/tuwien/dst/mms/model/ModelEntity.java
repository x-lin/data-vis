package at.ac.tuwien.dst.mms.model;

import at.ac.tuwien.dst.mms.util.Config;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.neo4j.annotation.Query;

import java.util.Map;

/**
 * Wrapper class to get entities under a common type and to provide common methods.
 * Note that this class should not contain a @NodeEntity annotation,
 * otherwise Spring will persist the data as both this type and its concrete subtype.
 */
public abstract class ModelEntity {

	@JsonIgnore
	@Query(value = "START n=node({self}) MATCH (n)-[]-(neighbor) RETURN neighbor")
	protected Iterable<Map<String, Object>> neighbors;

	@JsonIgnore
	@Query(value = "START n=node({self}) MATCH (n)-[]-(neighbor:GeneralNode) RETURN neighbor LIMIT 20")
	protected Iterable<Map<String, Object>> neighborsLimited;

	//TODO find out how to specify limit dynamically
	@JsonIgnore
	@Query(value = "START n=node({self}) MATCH (n)-[]->(neighbor:GeneralNode) RETURN neighbor LIMIT " + Config.SEARCH_LIMIT)
	private Iterable<Map<String, Object>> limitedNeighbors;

	@JsonIgnore
	public Iterable<Map<String, Object>> getNeighbors() {
		return neighbors;
	}

	@JsonIgnore
	public Iterable<Map<String, Object>> getNeighborsLimited() {
		return neighborsLimited;
	}
}
