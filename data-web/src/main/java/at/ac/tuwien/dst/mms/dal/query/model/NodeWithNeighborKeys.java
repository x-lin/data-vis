package at.ac.tuwien.dst.mms.dal.query.model;

import org.springframework.data.neo4j.annotation.QueryResult;
import org.springframework.data.neo4j.annotation.ResultColumn;

import java.util.List;

/**
 * Created by XLin on 29.04.2016.
 */
@QueryResult
public class NodeWithNeighborKeys {
	@ResultColumn("node")
	private String node;

	@ResultColumn("neighbors")
	private List<String> neighbors;

	public String getNode() {
		return node;
	}

	public List<String> getNeighbors() {
		return neighbors;
	}

	@Override
	public String toString() {
		return "NodeWithNeighborKeys{" +
				"node='" + node + '\'' +
				", neighbors=" + neighbors +
				'}';
	}
}
