package at.ac.tuwien.dst.mms.dal.query.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by XLin on 06.05.2016.
 */
public class Node {
	@JsonProperty
	private int nodeId;

	@JsonProperty
	private boolean optional;

	@JsonProperty
	private boolean isOutput;

	@JsonProperty
	private String key;

	@JsonProperty
	private Filters filters;

	public int getNodeId() {
		return nodeId;
	}

	public boolean isOptional() {
		return optional;
	}

	public boolean isOutput() {
		return isOutput;
	}

	public void setNodeId(int nodeId) {
		this.nodeId = nodeId;
	}

	public void setOptional(boolean optional) {
		this.optional = optional;
	}

	public void setOutput(boolean output) {
		isOutput = output;
	}

	public String getKey() {
		return key;
	}

	public Filters getFilters() {
		return filters;
	}

	public void setFilters(Filters filters) {
		this.filters = filters;
	}

	@Override
	public String toString() {
		return "Node{" +
				"nodeId=" + nodeId +
				", optional=" + optional +
				", isOutput=" + isOutput +
				", key='" + key + '\'' +
				", filters=" + filters +
				'}';
	}
}
