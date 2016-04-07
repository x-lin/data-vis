package at.ac.tuwien.dst.mms.dal.repo;

import at.ac.tuwien.dst.mms.dal.query.model.*;
import at.ac.tuwien.dst.mms.model.Project;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

import java.util.List;
import java.util.Map;

/**
 * Created by xlin on 08.01.2016.
 */
public interface ProjectRepository extends GraphRepository<Project>, ProjectRepositoryCustom {
	@Query("START  b=node:" + Project.PROJECT_KEY_INDEX +"(key = {0}) RETURN b")
	Project findByKey(String key);

	Project findByName(String name);

	//@Query("MATCH (n:Project) WHERE n.key = {0} RETURN n LIMIT {1}")
	Project findByJamaId(Integer id);

	@Query("MATCH (n:Project) WHERE n.jama = {0} RETURN n LIMIT {1}")
	Project findByParent(Integer id);

	@Override
	Iterable<Map<String, Object>> findNeighbors(String key, boolean upstream, boolean downstream, List<String> excluded,
												List<String> priority, Integer limit, List<String> type);

	@Query("MATCH (a:Project) RETURN a LIMIT {0}")
	List<Project> findAll(int limit);

	@Query("START a=node:" + Project.PROJECT_KEY_INDEX + "(key = {0}) match (a)-[]-(:GeneralNode)-[]-(g:GeneralNodeType) return g as node,count(*) as count")
	List<NodeSchemaObject> getNodeSchema(String key);

	@Query("START a=node:" + Project.PROJECT_KEY_INDEX + "(key = {0}) match (a)-[]-(:GeneralNode)-[]-(g:GeneralNodeType) return g as node,count(*) as count")
	List<NodeSchemaObject> getNodeSchema(String key, String relation);

	@Query("START a=node:" + Project.PROJECT_KEY_INDEX +"(key = {0}) match (a)-[]-(gn1:GeneralNode)-[]-(g1:GeneralNodeType), (a)-[]-(gn2:GeneralNode)-[]-(g2:GeneralNodeType), (gn1)-[r]->(gn2) return g1.key as source ,g2.key as target, type(r) as edgeType, count(*) as count")
	List<EdgeSchemaObject> getEdgeSchema(String key);

	@Query("START a=node:" + Project.PROJECT_KEY_INDEX +"(key = {0}) match (a)-[]-(gn1:GeneralNode)-[]-(g1:GeneralNodeType), (a)-[]-(gn2:GeneralNode)-[]-(g2:GeneralNodeType), (gn1)-[r:DOWNSTREAM]->(gn2) return g1.key as source ,g2.key as target, type(r) as edgeType, count(*) as count")
	List<EdgeSchemaObject> getEdgeSchema(String key, String relation);

	@Query("START n=node:" + Project.PROJECT_KEY_INDEX + "(key={0}) " +
			"MATCH (n)-[]-(o:GeneralNode) " +
			"WHERE (NOT EXISTS(o.jiraStatus) OR o.jiraStatus <> 'Closed')" +
			"RETURN count(n)")
	long countNeighbors(String key);

	@Query("START p=node:" + Project.PROJECT_KEY_INDEX + "(key={0}) " +
			"MATCH (p)-[:PROJECT]->(n:GeneralNode)--(n1:GeneralNodeType) " +
			"WHERE n1.key='SSS' OR n1.key='SRS' OR n1.key='PSRS' " +
			"AND NOT EXISTS((n)-[:DOWNSTREAM]->(:GeneralNode)-->(:GeneralNodeType{key: 'SSS'})) " +
			"OPTIONAL MATCH (n)-[:DOWNSTREAM]->(tc:GeneralNode)-->(:GeneralNodeType {key: 'TC'}) " +
			"RETURN n.key AS key, n.name AS name, n1.name AS type, COLLECT(tc.key) AS testcases, n AS node ")
	List<TestCoverage> getTestCoverage(String projectKey);

	@Query("START n=node:" + Project.PROJECT_KEY_INDEX + "(key={0}) " +
			"MATCH (n)-[:PROJECT]->(o)-[:NODE_TYPE]-(p) " +
			"RETURN p AS node, count(p) AS count, ['DOWNSTREAM'] AS relationship " +
			"ORDER BY count DESC")
	List<NeighborType> getNeighborTypes(String projectKey);
}
