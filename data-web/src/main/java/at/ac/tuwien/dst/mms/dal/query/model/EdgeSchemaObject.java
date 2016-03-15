package at.ac.tuwien.dst.mms.dal.query.model;

/**
 * Created by XLin on 08.03.2016.
 */
public class EdgeSchemaObject {
	private String source;

	private String target;

	private String edgeType;

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
