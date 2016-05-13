package at.ac.tuwien.dst.mms.dal.query.model;

import java.util.List;

/**
 * Created by XLin on 13.05.2016.
 */
public class Filters {
	private KeyValue operator;

	private List<Filter> filters;

	public KeyValue getOperator() {
		return operator;
	}

	public List<Filter> getFilters() {
		return filters;
	}

	@Override
	public String toString() {
		return "Filters{" +
				"operator=" + operator +
				", filters=" + filters +
				'}';
	}
}
