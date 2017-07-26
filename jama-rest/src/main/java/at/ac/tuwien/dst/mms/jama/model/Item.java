package at.ac.tuwien.dst.mms.jama.model;

import at.ac.tuwien.dst.mms.jama.rest.ItemTypeLookupRegistry;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

/**
 *
 * @author XLin
 */
public class Item implements Serializable {

    private Long jamaId;

    private LocationWrapper location;

    private String key;

    private String name;

    private FieldWrapper fields;

    private ItemType type;

    private Integer projectId;

    @JsonProperty("project")
    public void setProjectId(Integer projectId) {
        this.projectId = projectId;
    }

    @JsonProperty("projectId")
    public Integer getProjectId() {
        return this.projectId;
    }

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

    @JsonIgnore
    public FieldWrapper getFields() {
        return this.fields;
    }

    @JsonProperty("name")
    public String getName() {
        return fields.getName();
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

    @JsonProperty("status")
    public String getStatus() {
        return fields.getStatus();
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
