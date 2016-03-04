package at.ac.tuwien.dst.mms.jama.model;

import at.ac.tuwien.dst.mms.jama.rest.ItemTypeLookupRegistry;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by XLin on 02.03.2016.
 */
public class Item {

    private Long jamaId;

    private LocationWrapper location;

    private String key;

    private FieldWrapper fields;

    private ItemType type;

    @JsonProperty("project")
    Integer projectId;

    @JsonProperty("jamaId")
    public Long getJamaId() {
        return jamaId;
    }

    @JsonProperty("id")
    public void setJamaId(Long id) {
        jamaId = id;
    }

    @JsonProperty("jamaParentId")
    public Long getParentId() {
        return location.getItem();
    }

    @JsonProperty("key")
    public String getKey() {
        return key;
    }

    @JsonProperty("documentKey")
    public void setKey(String key) {
        this.key = key;
    }

    @JsonProperty("fields")
    public void setFields(FieldWrapper fields) {
        this.fields = fields;
    }

    @JsonProperty("location")
    public void setLocation(LocationWrapper location) {
        this.location = location;
    }

    @JsonProperty("itemType")
    public void setItemType(Integer itemType) {
        this.type = ItemTypeLookupRegistry.get().getItemType(itemType);
    }

    @JsonProperty("type")
    public ItemType getItemType() {
        return this.type;
    }

    @JsonProperty
    public String getName() {
        return this.fields.getName();
    }

    @Override
    public String toString() {
        return "Item{" +
                "jamaId=" + jamaId +
                ", location=" + location +
                ", key='" + key + '\'' +
                ", fields=" + fields +
                ", type=" + type +
                ", projectId=" + projectId +
                '}';
    }
}
