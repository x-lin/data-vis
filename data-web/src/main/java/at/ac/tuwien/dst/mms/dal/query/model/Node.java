package at.ac.tuwien.dst.mms.dal.query.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by XLin on 06.05.2016.
 */
public class Node {
	@JsonProperty
	private int nodeId;

	@JsonProperty
	private String key;

	@JsonProperty
	private boolean optional;

	@JsonProperty
	private boolean isOutput;

	public int getNodeId() {
		return nodeId;
	}

	public String getKey() {
		return key;
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

	public void setKey(String key) {
		this.key = key;
	}

	public void setOptional(boolean optional) {
		this.optional = optional;
	}

	public void setOutput(boolean output) {
		isOutput = output;
	}

	@Override
	public String toString() {
		return "Node{" +
				"nodeId=" + nodeId +
				", key='" + key + '\'' +
				", optional=" + optional +
				", isOutput=" + isOutput +
				'}';
	}
}
