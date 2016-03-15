package at.ac.tuwien.dst.mms.dal.query.model;

import at.ac.tuwien.dst.mms.model.GeneralNode;
import org.springframework.data.neo4j.annotation.QueryResult;
import org.springframework.data.neo4j.annotation.ResultColumn;

/**
 * Created by XLin on 14.03.2016.
 */
@QueryResult
public class TestCoverageQueryResult {
	@ResultColumn("key")
	private String key;

	@ResultColumn("name")
	private String name;

	@ResultColumn("type")
	private String type;

	@ResultColumn("testcase")
	private String testcase;

	@ResultColumn("node")
	private GeneralNode node;

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getTestcase() {
		return testcase;
	}

	public void setTestcase(String testcase) {
		this.testcase = testcase;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public GeneralNode getNode() {
		return node;
	}

	public void setNode(GeneralNode node) {
		this.node = node;
	}

	@Override
	public String toString() {
		return "TestCoverageQueryResult{" +
				"key='" + key + '\'' +
				", name='" + name + '\'' +
				", type='" + type + '\'' +
				", testcase='" + testcase + '\'' +
				'}';
	}
}
