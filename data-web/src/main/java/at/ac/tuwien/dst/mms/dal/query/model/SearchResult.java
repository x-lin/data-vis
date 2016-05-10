package at.ac.tuwien.dst.mms.dal.query.model;

import java.util.Map;

/**
 * Created by XLin on 10.05.2016.
 */
public class SearchResult {
	private Iterable<Map<String, Object>> items;

	private int count;

	private int startAt;

	public Iterable<Map<String, Object>> getItems() {
		return items;
	}

	public void setItems(Iterable<Map<String, Object>> items) {
		this.items = items;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public int getStartAt() {
		return startAt;
	}

	public void setStartAt(int startAt) {
		this.startAt = startAt;
	}

	@Override
	public String toString() {
		return "SearchResult{" +
				"items=" + items +
				", count=" + count +
				'}';
	}
}
