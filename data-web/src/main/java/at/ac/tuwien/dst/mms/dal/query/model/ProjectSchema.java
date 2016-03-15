package at.ac.tuwien.dst.mms.dal.query.model;

import java.util.List;

/**
 * Created by XLin on 08.03.2016.
 */
public class ProjectSchema {
	private List<EdgeSchemaObject> edges;

	private List<NodeSchemaObject> nodes;

	public List<EdgeSchemaObject> getEdges() {
		return edges;
	}

	public void setEdges(List<EdgeSchemaObject> edges) {
		this.edges = edges;
	}

	public List<NodeSchemaObject> getNodes() {
		return nodes;
	}

	public void setNodes(List<NodeSchemaObject> nodes) {
		this.nodes = nodes;
	}
}
