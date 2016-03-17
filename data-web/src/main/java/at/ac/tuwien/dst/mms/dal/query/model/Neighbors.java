package at.ac.tuwien.dst.mms.dal.query.model;

import at.ac.tuwien.dst.mms.model.ModelEntity;

import java.util.List;

/**
 * Created by XLin on 16.03.2016.
 */
public class Neighbors {
	private ModelEntity node;

	private List<ModelEntity> neighbors;


	public ModelEntity getNode() {
		return node;
	}

	public void setNode(ModelEntity node) {
		this.node = node;
	}

	public List<ModelEntity> getNeighbors() {
		return neighbors;
	}

	public void setNeighbors(List<ModelEntity> neighbors) {
		this.neighbors = neighbors;
	}
}
