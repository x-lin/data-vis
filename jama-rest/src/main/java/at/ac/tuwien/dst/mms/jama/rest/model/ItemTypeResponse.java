package at.ac.tuwien.dst.mms.jama.rest.model;

import at.ac.tuwien.dst.mms.jama.model.ItemType;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * Created by XLin on 04.03.2016.
 */
public class ItemTypeResponse {
	@JsonProperty("data")
	List<ItemType> itemTypes;

	@JsonProperty
	Meta meta;

	public List<ItemType> getItemTypes() {
		return itemTypes;
	}

	public void setItemTypes(List<ItemType> itemTypes) {
		this.itemTypes = itemTypes;
	}

	public PageInfo getPageInfo() {
		return meta.getPageInfo();
	}

	@Override
	public String toString() {
		return "ItemTypeResponse{" +
				"itemTypes=" + itemTypes +
				", meta=" + meta +
				'}';
	}
}
