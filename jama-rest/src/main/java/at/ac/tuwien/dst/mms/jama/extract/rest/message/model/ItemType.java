package at.ac.tuwien.dst.mms.jama.extract.rest.message.model;

import com.google.gson.annotations.SerializedName;

import java.util.Objects;

/**
 * Created by XLin on 04.03.2016.
 */
public final class ItemType {
    private final int id;

    @SerializedName( "typeKey" )
    private final String key;

    @SerializedName( "display" )
    private final String name;

    public ItemType( final int id, final String key, final String name ) {
        this.id = id;
        this.key = key;
        this.name = name;
    }

    public Integer getId() {
        return this.id;
    }

    public String getKey() {
        return this.key;
    }

    public String getName() {
        return this.name;
    }

    @Override
    public boolean equals( final Object o ) {
        if ( this == o ) return true;
        if ( o == null || getClass() != o.getClass() ) return false;
        final ItemType itemType = ( ItemType ) o;
        return this.id == itemType.id &&
                Objects.equals( this.key, itemType.key ) &&
                Objects.equals( this.name, itemType.name );
    }

    @Override
    public int hashCode() {
        return Objects.hash( this.id, this.key, this.name );
    }

    @Override
    public String toString() {
        return "ItemType{" +
                "id=" + this.id +
                ", key='" + this.key + '\'' +
                ", name='" + this.name + '\'' +
                '}';
    }
}
