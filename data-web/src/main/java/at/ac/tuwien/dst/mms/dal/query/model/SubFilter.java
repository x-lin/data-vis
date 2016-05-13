package at.ac.tuwien.dst.mms.dal.query.model;

/**
 * Created by XLin on 13.05.2016.
 */
public class SubFilter {
	private boolean isNot;

	private KeyValue filterType;

	private KeyValue relation;

	private KeyValue value;

	public boolean isNot() {
		return isNot;
	}

	public KeyValue getFilterType() {
		return filterType;
	}

	public KeyValue getRelation() {
		return relation;
	}

	public KeyValue getValue() {
		return value;
	}

	@Override
	public String toString() {
		return "SubFilter{" +
				"isNot=" + isNot +
				", filterType=" + filterType +
				", relation=" + relation +
				", value=" + value +
				'}';
	}
}
