package at.ac.tuwien.dst.mms.dal.repo;

import at.ac.tuwien.dst.mms.model.Issue;
import at.ac.tuwien.dst.mms.model.Project;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

import java.util.List;

/**
 * Created by xlin on 08.01.2016.
 */
public interface IssueRepository extends GraphRepository<Issue> {
	public Issue findByKey(String key);

	public List<Issue> findByProject(Project project);

	@Query("MATCH (a:Issue)-[:PROJECT]->(b:Project {key: {0}}) RETURN a")
	public List<Issue> findByProjectKey(String project);

	@Query("MATCH (a:Issue)-[:PROJECT]->(b:Project {key: {0}}) RETURN a LIMIT {1}")
	public List<Issue> findByProjectKeyLimit(String project, Integer limit);

	@Query("MATCH (a:Issue)-[:PROJECT]->(b:Project {key: {0}}) RETURN COUNT(a)")
	public Integer countByProject(String projectKey);

	@Query("MATCH (n:Issue) WHERE n.key =~ {0} RETURN n LIMIT {1}")
	//@Query("START n=node:label({0}) return n")
	//@Query("START node_auto_index(\"key:MNG-1*\") MATCH (n:Issue) RETURN n")
	public List<Issue> findByLikeKey(String key, Integer limit);
}
