package at.ac.tuwien.dst.mms.dal.repo;

import at.ac.tuwien.dst.mms.dal.query.model.NeighborType;
import at.ac.tuwien.dst.mms.dal.query.model.TestCoverage;
import at.ac.tuwien.dst.mms.model.GeneralNode;
import at.ac.tuwien.dst.mms.model.GeneralNodeJamaIndex;
import org.springframework.data.domain.Pageable;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

import java.util.List;
import java.util.Map;

/**
 * Created by xlin on 08.01.2016.
 */
public interface GeneralNodeRepository extends GraphRepository<GeneralNode>, GeneralNodeRepositoryCustom {
	@Query("START  a=node:" + GeneralNode.GENERAL_NODE_KEY_INDEX +"(key = {0}) RETURN a")
	GeneralNode findByKey(String key);

	//TODO fix some issues with duplicate entries
	@Query("MATCH (p:Project)--(a:GeneralNode)--(b:GeneralNodeType) WHERE a.name={0} AND (b.key='BUG' OR b.key='WP') AND p.key={1} RETURN a LIMIT 1")
	GeneralNode findbyName(String name, String projectKey);

	@Query("MATCH (a:GeneralNode) RETURN a LIMIT {0}")
	List<GeneralNode> findAll(int limit);

	List<GeneralNode> findAllByKey(String key, Pageable pageable);

	List<GeneralNode> findAllByKey(String key);

	@Override
	Iterable<Map<String, Object>> findNeighbors(String key, boolean upstream, boolean downstream, List<String> excluded,
												List<String> priority, Integer limit, List<String> type);

	@Query("START  a=node:" + GeneralNodeJamaIndex.KEY_INDEX +"(jamaId = {0}) MATCH (a)-[]-(b) RETURN b")
	GeneralNode findByJamaId(Long id);

	@Query("START no=node:" + GeneralNode.GENERAL_NODE_KEY_INDEX + "(key={0}) " +
			"MATCH path=(no)-[:DOWNSTREAM*0..10]->(n:GeneralNode), (n)--(n1:GeneralNodeType) " +
			"WHERE n1.key='SSS' OR n1.key='SRS' OR n1.key='PSRS' " +
			"WITH path, NODES(path)[1..-1] AS nodes, n1,no,n " +
			"WHERE ALL(x IN nodes[1..] WHERE (x.key='SSS' OR x.key='SRS' OR x.key='PSRS' OR x.key='FEAT' OR x.key='WP')) " +
			"AND NOT EXISTS((n)-[:DOWNSTREAM]->(:GeneralNode)-->(:GeneralNodeType{key: 'SSS'})) " +
			"OPTIONAL MATCH (n)-[:DOWNSTREAM]->(tc:GeneralNode)-->(:GeneralNodeType {key: 'TC'}) " +
			"RETURN n.key AS key, n.name AS name, n1.name AS type, COLLECT(tc.key) AS testcases, n AS node")
	List<TestCoverage> getTestCoverage(String key);

	@Query("START n=node:" + GeneralNode.GENERAL_NODE_KEY_INDEX + "(key={0}) " +
			"MATCH (n)-[]-(o:GeneralNode) " +
			"WHERE (NOT EXISTS(o.jiraStatus) OR o.jiraStatus <> 'Closed')" +
			"RETURN count(n)")
	long countNeighbors(String key);

	@Query("START n=node:" + GeneralNode.GENERAL_NODE_KEY_INDEX + "(key={0}) " +
			"MATCH (n)-[:DOWNSTREAM]->(o)-[:NODE_TYPE]-(p) " +
			"RETURN p AS node, count(p) AS count, ['DOWNSTREAM'] AS relationship " +
			"ORDER BY count DESC " +
			"UNION " +
			"START n=node:" + GeneralNode.GENERAL_NODE_KEY_INDEX + "(key={0}) " +
			"MATCH (n)<-[:DOWNSTREAM]-(o)-[:NODE_TYPE]-(p) " +
			"RETURN p AS node, count(p) AS count, ['UPSTREAM'] AS relationship " +
			"ORDER BY count DESC " +
			"UNION " +
			"START n=node:" + GeneralNode.GENERAL_NODE_KEY_INDEX + "(key={0}) " +
			"MATCH (n)-[:UNCLASSIFIED]-(o)-[:NODE_TYPE]-(p) " +
			"RETURN p AS node, count(p) AS count, ['UPSTREAM', 'DOWNSTREAM'] AS relationship " +
			"ORDER BY count DESC")
	List<NeighborType> getNeighborTypes(String key);
}
