package at.ac.tuwien.dst.mms.dal.repo;

import at.ac.tuwien.dst.mms.dal.query.model.EdgeSchemaObject;
import at.ac.tuwien.dst.mms.dal.query.model.NodeSchemaObject;
import at.ac.tuwien.dst.mms.dal.query.model.TestCoverage;
import at.ac.tuwien.dst.mms.model.Project;
import org.springframework.data.domain.Pageable;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

import java.util.List;

/**
 * Created by xlin on 08.01.2016.
 */
public interface ProjectRepository extends GraphRepository<Project>, ProjectRepositoryCustom {
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

	@Query("START b=node:" + Project.PROJECT_KEY_INDEX + "(key = {0}) MATCH (a:Issue)-[:PROJECT]->(b) RETURN COUNT(a)")
	public Integer countIssues(String key);

	@Query(value="start a=node:" + Project.PROJECT_KEY_INDEX + "(key = {0}) match (a)-[]-(:GeneralNode)-[]-(g:GeneralNodeType) return g as node,count(*) as count")
	public List<NodeSchemaObject> getNodeSchema(String key);

	@Query(value="start a=node:" + Project.PROJECT_KEY_INDEX + "(key = {0}) match (a)-[]-(:GeneralNode)-[]-(g:GeneralNodeType) return g as node,count(*) as count")
	public List<NodeSchemaObject> getNodeSchema(String key, String relation);

	@Query(value="start a=node:" + Project.PROJECT_KEY_INDEX +"(key = {0}) match (a)-[]-(gn1:GeneralNode)-[]-(g1:GeneralNodeType), (a)-[]-(gn2:GeneralNode)-[]-(g2:GeneralNodeType), (gn1)-[r]->(gn2) return g1.key as source ,g2.key as target, type(r) as edgeType, count(*) as count")
	public List<EdgeSchemaObject> getEdgeSchema(String key);

	@Query(value="start a=node:" + Project.PROJECT_KEY_INDEX +"(key = {0}) match (a)-[]-(gn1:GeneralNode)-[]-(g1:GeneralNodeType), (a)-[]-(gn2:GeneralNode)-[]-(g2:GeneralNodeType), (gn1)-[r:DOWNSTREAM]->(gn2) return g1.key as source ,g2.key as target, type(r) as edgeType, count(*) as count")
	public List<EdgeSchemaObject> getEdgeSchema(String key, String relation);

	@Query(value="START p=node:projectKeyIndex(key={0})" +
			"MATCH (p)-[:PROJECT]->(n:GeneralNode)--(n1:GeneralNodeType)" +
			"WHERE n1.key='SSS' OR n1.key='SRS' OR n1.key='PSRS'" +
			"AND NOT EXISTS((n)<-[:DOWNSTREAM]-(:GeneralNode)-->(:GeneralNodeType{key: 'SSS'}))" +
			"OPTIONAL MATCH (n)-[:DOWNSTREAM]->(tc:GeneralNode)-->(:GeneralNodeType {key: 'TC'})" +
			"RETURN n.key AS key, n.name AS name, n1.name + ' (' + n1.key + ')' AS type, COLLECT(tc.key) AS testcases, n AS node")
	public List<TestCoverage> getTestCoverage(String projectKey);

//	@Query(value="START p=node:projectKeyIndex(key={0}) MATCH (p)-[]-(n:GeneralNode)-[]-(m:GeneralNodeType) RETURN n LIMIT 20") //direction
//			"WHERE m.key<>'FEAT'" + //{2}
//			"WITH m,n,p, " +
//			"CASE m.key" +
//			"  WHEN 'FEAT' THEN 0" +
//			"  WHEN 'SSS' THEN 1" +
//			"  WHEN 'SRS' THEN 2" +
//			"  ELSE 3" +
//			"END as sortOrder" +
//			"RETURN n ORDER BY sortOrder" +
//			"LIMIT {4}")
//	public List<GeneralNode> getNeighbors(String key, String upstream, String downstream, String excluded, String priority, Integer limit);

//	Iterable<Map<String, Object>> findNeighbors(String key, boolean upstream, boolean downstream, List<String> excluded,
//												List<String> priority, Integer limit);
}
