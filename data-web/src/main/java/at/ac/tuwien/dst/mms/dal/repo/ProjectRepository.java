package at.ac.tuwien.dst.mms.dal.repo;

import at.ac.tuwien.dst.mms.dal.query.model.TestCoverageQueryResult;
import at.ac.tuwien.dst.mms.model.Issue;
import at.ac.tuwien.dst.mms.model.Project;
import org.springframework.data.domain.Pageable;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

import java.util.List;
import java.util.Map;

/**
 * Created by xlin on 08.01.2016.
 */
public interface ProjectRepository extends GraphRepository<Project> {
	@Query("START  b=node:" + Project.PROJECT_KEY_INDEX +"(key = {0}) RETURN b")
	public Project findByKey(String key);

	public Project findByName(String name);

	//@Query("MATCH (n:Project) WHERE n.key = {0} RETURN n LIMIT {1}")
	public Project findByJamaId(Integer id);

	@Query("MATCH (n:Project) WHERE n.jama = {0} RETURN n LIMIT {1}")
	public Project findByParent(Integer id);

//	@Query("MATCH (n:Project) WHERE n.key =~ {0} RETURN n")
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

	@Query(value="start a=node:" + Project.PROJECT_KEY_INDEX + "(key = {0}) match (a)-[]-(:GeneralNode)-[]-(g:GeneralNodeType) return g as node,count(*) as count")
	public Iterable<Map<String, Object>> getNodeSchema(String key);

	@Query(value="start a=node:" + Project.PROJECT_KEY_INDEX + "(key = {0}) match (a)-[]-(:GeneralNode)-[]-(g:GeneralNodeType) return g as node,count(*) as count")
	public Iterable<Map<String, Object>> getNodeSchema(String key, String relation);

	@Query(value="start a=node:" + Project.PROJECT_KEY_INDEX +"(key = {0}) match (a)-[]-(gn1:GeneralNode)-[]-(g1:GeneralNodeType), (a)-[]-(gn2:GeneralNode)-[]-(g2:GeneralNodeType), (gn1)-[r]->(gn2) return g1.key as source ,g2.key as target, type(r) as edgeType, count(*) as count")
	public Iterable<Map<String, Object>> getEdgeSchema(String key);

	@Query(value="start a=node:" + Project.PROJECT_KEY_INDEX +"(key = {0}) match (a)-[]-(gn1:GeneralNode)-[]-(g1:GeneralNodeType), (a)-[]-(gn2:GeneralNode)-[]-(g2:GeneralNodeType), (gn1)-[r:DOWNSTREAM]->(gn2) return g1.key as source ,g2.key as target, type(r) as edgeType, count(*) as count")
	public Iterable<Map<String, Object>> getEdgeSchema(String key, String relation);

	@Query(value="START p=node:projectKeyIndex(key={0})" +
			"MATCH (p)-[:PROJECT]->(n:GeneralNode)--(n1:GeneralNodeType)" +
			"WHERE n1.key='SSS' OR n1.key='SRS' OR n1.key='PSRS'" +
			"AND NOT EXISTS((n)-[:DOWNSTREAM]->(:GeneralNode)-->(:GeneralNodeType{key: 'SSS'}))" +
			"OPTIONAL MATCH (n)<-[:DOWNSTREAM]-(tc:GeneralNode)--(:GeneralNodeType {key: 'TC'})" +
			"RETURN n.key AS key, n.name AS name, n1.name + ' (' + n1.key + ')' AS type, tc.key AS testcase, n AS node")
	public List<TestCoverageQueryResult> getTestCoverage(String projectKey);
}
