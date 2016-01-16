package at.ac.tuwien.dst.mms.dal.repo;

import at.ac.tuwien.dst.mms.model.Issue;
import at.ac.tuwien.dst.mms.model.Project;
import org.springframework.data.domain.Pageable;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

import java.util.List;

/**
 * Created by xlin on 08.01.2016.
 */
public interface ProjectRepository extends GraphRepository<Project> {
	public Project findByKey(String key);

	public Project findByName(String name);

	public List<Project> findAllByKey(String key, Pageable pageable);

	public List<Project> findAllByKey(String key);

//	@Query("MATCH (n:Project) WHERE n.key =~ {0} RETURN n LIMIT {1}")
//	public List<Project> findByLikeKey(String key, Integer limit);

	@Query("MATCH (a:Project) RETURN a LIMIT {0}")
	public List<Project> findAll(int limit);

	@Query("START  b=node:" + Project.PROJECT_KEY_INDEX +"(key = {0}) MATCH (a:Issue)-[:PROJECT]->(b) RETURN a LIMIT {1}")
	public List<Issue> findIssues(String project, Integer limit);

	@Query("START  b=node:" + Project.PROJECT_KEY_INDEX +"(key = {0}) MATCH (a:Issue)-[:PROJECT]->(b) RETURN a")
	public List<Issue> findIssues(String project);

	@Query("START b=node:" + Project.PROJECT_KEY_INDEX + "(key = {0}) MATCH (a:Issue)-[:PROJECT]->(b) RETURN COUNT(a)")
	public Integer countIssues(String key);
}
