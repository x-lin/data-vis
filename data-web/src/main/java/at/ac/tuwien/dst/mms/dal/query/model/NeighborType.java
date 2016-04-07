package at.ac.tuwien.dst.mms.dal.query.model;

import at.ac.tuwien.dst.mms.model.GeneralNodeType;
import org.springframework.data.neo4j.annotation.QueryResult;
import org.springframework.data.neo4j.annotation.ResultColumn;

/**
 * Created by XLin on 22.03.2016.
 */
@QueryResult
public class NeighborType {
	@ResultColumn("node")
	private GeneralNodeType node;

	@ResultColumn("count")
	private int count;

	@ResultColumn("relationship")
	private String[] relationship;

	public GeneralNodeType getNode() {
		return node;
	}

	public void setNode(GeneralNodeType node) {
		this.node = node;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public String[] getRelationship() {
		return relationship;
	}

	public void setRelationship(String[] relationship) {
		this.relationship = relationship;
	}
}
