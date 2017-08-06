package at.ac.tuwien.dst.mms.jama.extract.rest.message.model;

import com.google.gson.annotations.SerializedName;

import java.util.Objects;

/**
 * @author XLin
 */
public class Item {
    private long id;

    private LocationWrapper location;

    @SerializedName( "itemType" )
    private int itemTypeId;

    @SerializedName( "documentKey" )
    private String key;

    private String name;

    private FieldWrapper fields;

    private Integer projectId;

    public Integer getProjectId() {
        return this.projectId;
    }

    public Long getId() {
        return this.id;
    }

    public Long getParentId() {
        return this.location.getItem();
    }

    public String getKey() {
        return this.key;
    }

    public FieldWrapper getFields() {
        return this.fields;
    }

    public String getName() {
        return this.fields.getName();
    }

    public String getStatus() {
        return this.fields.getStatus();
    }

    @Override
    public boolean equals( final Object o ) {
        if ( this == o ) return true;
        if ( o == null || getClass() != o.getClass() ) return false;
        final Item item = ( Item ) o;
        return this.id == item.id &&
                this.itemTypeId == item.itemTypeId &&
                Objects.equals( this.location, item.location ) &&
                Objects.equals( this.key, item.key ) &&
                Objects.equals( this.name, item.name ) &&
                Objects.equals( this.fields, item.fields ) &&
                Objects.equals( this.projectId, item.projectId );
    }

    @Override
    public int hashCode() {
        return Objects.hash( this.id, this.location, this.itemTypeId, this.key, this.name, this.fields, this
                .projectId );
    }

    @Override
    public String toString() {
        return "Item{" +
                "id=" + this.id +
                ", location=" + this.location +
                ", itemTypeId=" + this.itemTypeId +
                ", key='" + this.key + '\'' +
                ", name='" + this.name + '\'' +
                ", fields=" + this.fields +
                ", projectId=" + this.projectId +
                '}';
    }
}
