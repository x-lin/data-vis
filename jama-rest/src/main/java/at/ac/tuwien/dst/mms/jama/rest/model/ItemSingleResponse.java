package at.ac.tuwien.dst.mms.jama.rest.model;

import at.ac.tuwien.dst.mms.jama.model.Item;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by XLin on 22.04.2016.
 */
public class ItemSingleResponse {
	@JsonProperty("data")
	Item item;

	@JsonProperty
	Meta meta;

	public Item getItem() {
		return item;
	}

	public void setItem(Item item) {
		this.item = item;
	}

	public Meta getMeta() {
		return meta;
	}

	public void setMeta(Meta meta) {
		this.meta = meta;
	}
}
