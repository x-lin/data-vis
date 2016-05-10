package at.ac.tuwien.dst.mms.dal.query.model;

/**
 * Created by XLin on 06.05.2016.
 */
public class Edge {
	private String direction;

	private Integer minPathLength;

	private Integer maxPathLength;

	private Integer sourceId;

	private Integer targetId;

	public String getDirection() {
		return direction;
	}

	public Integer getSourceId() {
		return sourceId;
	}

	public Integer getTargetId() {
		return targetId;
	}

	public Integer getMinPathLength() {
		return minPathLength;
	}

	public Integer getMaxPathLength() {
		return maxPathLength;
	}

	@Override
	public String toString() {
		return "Edge{" +
				"direction='" + direction + '\'' +
				", minPathLength=" + minPathLength +
				", maxPathLength=" + maxPathLength +
				", sourceId='" + sourceId + '\'' +
				", targetId='" + targetId + '\'' +
				'}';
	}
}
