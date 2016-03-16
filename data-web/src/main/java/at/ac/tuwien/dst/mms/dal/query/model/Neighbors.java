package at.ac.tuwien.dst.mms.dal.query.model;

import at.ac.tuwien.dst.mms.model.GeneralNode;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by XLin on 16.03.2016.
 */
public class Neighbors {
	private GeneralNode node;

	private List<GeneralNode> neighbors;

	public Neighbors() {
		neighbors = new ArrayList<>();
	}

	public GeneralNode getNode() {
		return node;
	}

	public void setNode(GeneralNode node) {
		this.node = node;
	}

	public List<GeneralNode> getNeighbors() {
		return neighbors;
	}

	public void setNeighbors(List<GeneralNode> neighbors) {
		this.neighbors = neighbors;
	}
}
