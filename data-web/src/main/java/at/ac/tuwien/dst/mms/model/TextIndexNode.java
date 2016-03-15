package at.ac.tuwien.dst.mms.model;

import org.neo4j.graphdb.Node;
import org.springframework.data.neo4j.annotation.Fetch;
import org.springframework.data.neo4j.annotation.GraphProperty;
import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.support.index.IndexType;

import java.util.Set;

/**
 * Created by XLin on 09.03.2016.
 */
public class TextIndexNode {
	private final String TEXT_INDEX_NODE_KEY_INDEX = "textIndexNodeKeyIndex";

	@GraphProperty
	@Indexed(unique = true, indexName=TEXT_INDEX_NODE_KEY_INDEX, indexType = IndexType.FULLTEXT, failOnDuplicate = true)
	private String text;

	@GraphProperty
	@Fetch
	private Set<Node> nodes;

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Set<Node> getNodes() {
		return nodes;
	}

	public void setNodes(Set<Node> nodes) {
		this.nodes = nodes;
	}
}
