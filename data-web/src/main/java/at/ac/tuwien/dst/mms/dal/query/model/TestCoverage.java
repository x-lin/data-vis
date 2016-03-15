package at.ac.tuwien.dst.mms.dal.query.model;

import at.ac.tuwien.dst.mms.model.GeneralNode;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by XLin on 15.03.2016.
 */
public class TestCoverage {
	private String key;

	private String name;

	private String type;

	private List<String> testcases;

	private GeneralNode node;

	public TestCoverage() {
		testcases = new ArrayList<>();
	}

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

	public List<String> getTestcases() {
		return testcases;
	}

	public void setTestcases(List<String> testcases) {
		this.testcases = testcases;
	}

	public void addTestcase(String testcase) {
		this.testcases.add(testcase);
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
}
