package at.ac.tuwien.dst.mms.dal.query.model;

import java.util.List;

/**
 * Created by XLin on 13.05.2016.
 */
public class Filter {
	private List<SubFilter> filters;

	private KeyValue operator;

	public List<SubFilter> getFilters() {
		return filters;
	}

	public KeyValue getOperator() {
		return operator;
	}

	@Override
	public String toString() {
		return "Filter{" +
				"filters=" + filters +
				", operator=" + operator +
				'}';
	}
}
