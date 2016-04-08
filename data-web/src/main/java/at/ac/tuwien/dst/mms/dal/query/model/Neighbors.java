package at.ac.tuwien.dst.mms.dal.query.model;

import at.ac.tuwien.dst.mms.model.ModelEntity;

import java.util.List;
import java.util.Map;

/**
 * Created by XLin on 16.03.2016.
 */
public class Neighbors {
	private ModelEntity node;

	private List<Map<String, Object>> neighbors;

	public ModelEntity getNode() {
		return node;
	}

	public void setNode(ModelEntity node) {
		this.node = node;
	}

	public List<Map<String, Object>> getNeighbors() {
		return neighbors;
	}

	public void setNeighbors(List<Map<String, Object>> neighbors) {
		this.neighbors = neighbors;
	}

	@Override
	public String toString() {
		return "Neighbors{" +
				"node=" + node +
				", neighbors=" + neighbors +
				'}';
	}
}
