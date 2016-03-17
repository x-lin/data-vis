package at.ac.tuwien.dst.mms.dal.query.model;

import at.ac.tuwien.dst.mms.model.GeneralNodeType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.neo4j.annotation.QueryResult;
import org.springframework.data.neo4j.annotation.ResultColumn;

/**
 * Created by XLin on 08.03.2016.
 */
@QueryResult
public class NodeSchemaObject {
	@ResultColumn("node")
	@JsonIgnore
	private GeneralNodeType node;

	@ResultColumn("count")
	private Integer count;

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public void setNode(GeneralNodeType node) {
		this.node = node;
	}

	@JsonProperty
	public String getKey() {
		return node.getKey();
	}

	@JsonProperty
	public String getName() {
		return node.getName();
	}

	@Override
	public String toString() {
		return "NodeSchemaObject{" +
				"node=" + node +
				", count=" + count +
				'}';
	}
}
