package at.ac.tuwien.dst.mms.dal.query.model;

/**
 * Created by XLin on 08.03.2016.
 */
public class NodeSchemaObject {
	private String name;

	private String key;

	private Integer count;

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}
}
