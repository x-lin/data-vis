package at.ac.tuwien.dst.mms.dal.repo;

import at.ac.tuwien.dst.mms.model.Requirement;
import org.springframework.data.domain.Pageable;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

import java.util.List;

/**
 * Created by xlin on 08.01.2016.
 */
public interface RequirementRepository  extends GraphRepository<Requirement> {
	public Requirement findByKey(String key);

	@Query("MATCH (n:Requirement) WHERE n.key =~ {0} RETURN n LIMIT {1}")
	public List<Requirement> findByLikeKey(String key, Integer limit);

	public List<Requirement> findAllByKey(String key);

	public List<Requirement> findAllByKey(String key, Pageable pageable);

	@Query("MATCH (a:Requirement) RETURN a LIMIT {0}")
	public List<Requirement> findAll(int limit);

//	@Query("MATCH (a:Issue)-[:REQUIREMENT]->(b:Requirement {key: {0}}) RETURN a")
//	public List<Issue> findIssues(String key);
//
//	@Query("MATCH (a:Issue)-[:REQUIREMENT]->(b:Requirement {key: {0}}) RETURN a LIMIT {1}")
//	public List<Issue> findByRequirementKeyLimit(String project, Integer limit);
}
