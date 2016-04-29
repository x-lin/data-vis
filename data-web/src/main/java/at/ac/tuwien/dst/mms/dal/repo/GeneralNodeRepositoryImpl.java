package at.ac.tuwien.dst.mms.dal.repo;

import at.ac.tuwien.dst.mms.model.GeneralNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;

import java.util.List;
import java.util.Map;

/**
 * Created by XLin on 17.03.2016.
 */
public class GeneralNodeRepositoryImpl implements GeneralNodeRepositoryCustom {
	@Autowired
	Neo4jTemplate template;

	@Autowired
	NeighborQueryBuilder queryBuilder;

	@Override
	public Iterable<Map<String, Object>> findNeighbors(String key, boolean upstream, boolean downstream,
													   List<String> excluded, List<String> priority, Integer limit, List<String> type) {

		String query = queryBuilder.buildQuery(GeneralNode.GENERAL_NODE_KEY_INDEX, key, upstream, downstream, excluded, priority, limit, type);

		return template.query(query, null);
	}

	@Override
	public Iterable<Map<String, Object>> findNodesAndNeighborKeys(List<String> keys) {
		String keyString = "";

		for(String key : keys) {
			keyString += "key:" + key + " ";
		}
		String query = "START n=node:generalNodeKeyIndex('" + keyString + "') OPTIONAL MATCH (n)-[:DOWNSTREAM|:UNCLASSIFIED]-(n1:GeneralNode) RETURN n AS node, COLLECT(n1.key) AS neighbors";

		System.out.println("query: " + query);

		return template.query(query, null);
	}
}
