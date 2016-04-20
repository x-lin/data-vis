package at.ac.tuwien.dst.mms.dal.query.model;

import at.ac.tuwien.dst.mms.model.GeneralNode;
import org.springframework.data.neo4j.annotation.QueryResult;
import org.springframework.data.neo4j.annotation.ResultColumn;

import java.util.List;

/**
 * Created by XLin on 19.04.2016.
 */
@QueryResult
public class BugCoverage {
	@ResultColumn("path")
	private List<GeneralNode> path;

	@ResultColumn("bug")
	private GeneralNode bug;

	public List<GeneralNode> getPath() {
		return path;
	}

	public void setPath(List<GeneralNode> path) {
		this.path = path;
	}

	public GeneralNode getBug() {
		return bug;
	}

	public void setBug(GeneralNode bug) {
		this.bug = bug;
	}
}
