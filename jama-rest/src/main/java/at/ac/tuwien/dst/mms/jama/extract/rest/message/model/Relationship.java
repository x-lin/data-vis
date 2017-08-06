package at.ac.tuwien.dst.mms.jama.extract.rest.message.model;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.Objects;

/**
 * Created by XLin on 07.03.2016.
 */
public class Relationship implements Serializable {
    @SerializedName( "from" )
    private long fromItemId;

    @SerializedName( "to" )
    private long toItemId;

    public Relationship() {
    }

    public Relationship( final long fromItemId, final long toItemId ) {
        this.fromItemId = fromItemId;
        this.toItemId = toItemId;
    }

    public Long getFromItemId() {
        return this.fromItemId;
    }

    public Long getToItemId() {
        return this.toItemId;
    }

    @Override
    public boolean equals( final Object o ) {
        if ( this == o ) return true;
        if ( o == null || getClass() != o.getClass() ) return false;
        final Relationship that = ( Relationship ) o;
        return this.fromItemId == that.fromItemId &&
                this.toItemId == that.toItemId;
    }

    @Override
    public int hashCode() {
        return Objects.hash( this.fromItemId, this.toItemId );
    }

    @Override
    public String toString() {
        return "Relationship{" +
                "fromItemId=" + this.fromItemId +
                ", toItemId=" + this.toItemId +
                '}';
    }
}
