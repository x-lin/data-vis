package at.ac.tuwien.dst.mms.dal.query.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * Created by XLin on 06.05.2016.
 */
public class QueryGraph {
	@JsonProperty
	private List<Edge> edges;

	@JsonProperty
	private List<Node> nodes;

	@JsonProperty
	private Node source;

	public List<Edge> getEdges() {
		return edges;
	}

	public List<Node> getNodes() {
		return nodes;
	}

	public Node getSource() {
		return source;
	}

	public void setEdges(List<Edge> edges) {
		this.edges = edges;
	}

	public void setNodes(List<Node> nodes) {
		this.nodes = nodes;
	}

	public void setSource(Node source) {
		this.source = source;
	}

	@Override
	public String toString() {
		return "QueryGraph{" +
				"edges=" + edges +
				", nodes=" + nodes +
				", source=" + source +
				'}';
	}
}
