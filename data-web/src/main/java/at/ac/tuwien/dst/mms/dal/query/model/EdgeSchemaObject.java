package at.ac.tuwien.dst.mms.dal.query.model;

import org.springframework.data.neo4j.annotation.QueryResult;
import org.springframework.data.neo4j.annotation.ResultColumn;

/**
 * Created by XLin on 08.03.2016.
 */
@QueryResult
public class EdgeSchemaObject {
	@ResultColumn("source")
	private String source;

	@ResultColumn("target")
	private String target;

	@ResultColumn("edgeType")
	private String edgeType;

	@ResultColumn("count")
	private Integer count;

	public void setSource(String source) {
		this.source = source;
	}

	public void setTarget(String target) {
		this.target = target;
	}

	public void setEdgeType(String edgeType) {
		this.edgeType = edgeType;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public String getSource() {
		return source;
	}

	public String getTarget() {
		return target;
	}

	public String getEdgeType() {
		return edgeType;
	}

	public Integer getCount() {
		return count;
	}

	@Override
	public String toString() {
		return "EdgeSchemaObject{" +
				"source=" + source +
				", target=" + target +
				", edgeType='" + edgeType + '\'' +
				", count=" + count +
				'}';
	}
}
