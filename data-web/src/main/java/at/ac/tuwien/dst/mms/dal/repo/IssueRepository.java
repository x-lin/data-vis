package at.ac.tuwien.dst.mms.dal.repo;

import at.ac.tuwien.dst.mms.model.Issue;
import at.ac.tuwien.dst.mms.model.Project;
import at.ac.tuwien.dst.mms.model.Requirement;
import at.ac.tuwien.dst.mms.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

import java.util.List;
import java.util.Map;

/**
 * Created by xlin on 08.01.2016.
 */
public interface IssueRepository extends GraphRepository<Issue> {
	@Query("START  a=node:" + Issue.ISSUE_KEY_INDEX +"(key = {0}) RETURN a")
	public Issue findByKey(String key);

	public List<Issue> findByProject(Project project);

	public List<Issue> findByUser(User user);

	@Query("START  a=node:" + Issue.ISSUE_KEY_INDEX +"(key = {0}) MATCH (a)-[:REQUIREMENT]-(b:Requirement) RETURN b")
	public List<Requirement> findRequirements(String key);

	@Query("MATCH (a:Issue) RETURN a LIMIT {0}")
	public List<Issue> findAll(int limit);

	public List<Issue> findAllByKey(String key, Pageable pageable);

	public List<Issue> findAllByKey(String key);

	@Query(value = "START n=node:issueKeyIndex(key = {0}) MATCH (n)-[]-(neighbor) RETURN neighbor")
	public Iterable<Map<String, Object>> findNeighbors(String key);
}
