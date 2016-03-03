package at.ac.tuwien.dst.mms.jama.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by XLin on 02.03.2016.
 */
public class Node {
    Long id;

    @JsonProperty("documentKey")
    String key;

    String type;

    Integer parentId;

    @JsonIgnore
    Integer[] relationships;
}
