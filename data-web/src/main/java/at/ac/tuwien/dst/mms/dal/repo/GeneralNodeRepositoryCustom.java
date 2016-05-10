package at.ac.tuwien.dst.mms.dal.repo;

import at.ac.tuwien.dst.mms.dal.query.model.Edge;
import at.ac.tuwien.dst.mms.dal.query.model.Node;

import java.util.List;
import java.util.Map;

/**
 * Created by XLin on 17.03.2016.
 */
public interface GeneralNodeRepositoryCustom {
	Iterable<Map<String, Object>> findNeighbors(String key, boolean upstream, boolean downstream, List<String> excluded,
												List<String> priority, Integer limit, List<String> type);

	Iterable<Map<String, Object>> findNodesAndNeighborKeys(List<String> keys);

	Iterable<Map<String, Object>> findByQueryBuilder(Node source, List<Node> nodes, List<Edge> edges);
}
