package at.ac.tuwien.dst.mms.jama.rest.model;

import at.ac.tuwien.dst.mms.jama.model.Item;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * Created by XLin on 04.03.2016.
 */
public class ItemResponse {
	@JsonProperty("data")
	List<Item> items;

	@JsonProperty
	Meta meta;

	public List<Item> getItems() {
		return items;
	}

	public void setItems(List<Item> items) {
		this.items = items;
	}

	public PageInfo getPageInfo() {
		return meta.getPageInfo();
	}

	@Override
	public String toString() {
		return "ItemResponse{" +
				"items=" + items +
				", pageInfo=" + meta.getPageInfo() +
				'}';
	}
}
