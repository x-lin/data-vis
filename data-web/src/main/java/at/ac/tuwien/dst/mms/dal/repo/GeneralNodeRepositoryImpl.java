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
}
