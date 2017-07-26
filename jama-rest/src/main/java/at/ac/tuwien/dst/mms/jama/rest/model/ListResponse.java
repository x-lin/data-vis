package at.ac.tuwien.dst.mms.jama.rest.model;

import at.ac.tuwien.dst.mms.jama.model.ItemType;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * @author LinX
 */
public class ListResponse<T> {
    @JsonProperty("data")
    private List<T> data;

    @JsonProperty
    Meta meta;

    public PageInfo getPageInfo() {
        return meta.getPageInfo();
    }

    public List<T> get() {
        return data;
    }
}
