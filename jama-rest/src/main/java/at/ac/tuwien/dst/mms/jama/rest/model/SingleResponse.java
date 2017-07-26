package at.ac.tuwien.dst.mms.jama.rest.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * @author LinX
 */
public class SingleResponse<T> {
    @JsonProperty("data")
    T data;

    @JsonProperty
    Meta meta;

    public PageInfo getPageInfo() {
        return meta.getPageInfo();
    }

    public T get() {
        return data;
    }
}
