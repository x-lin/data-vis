package at.ac.tuwien.dst.mms.jama.extract.rest.message.model;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.Objects;

/**
 * @author XLin
 */
public class FieldWrapper implements Serializable {
    private String name;

    private String status;

    @SerializedName( "text8" )
    private String upstreamString;

    @SerializedName( "text9" )
    private String downstreamString;

    public String getName() {
        return this.name;
    }

    public String getStatus() {
        return this.status;
    }

    public String getUpstreamString() {
        return this.upstreamString;
    }

    public String getDownstreamString() {
        return this.downstreamString;
    }

    @Override
    public boolean equals( final Object o ) {
        if ( this == o ) return true;
        if ( o == null || getClass() != o.getClass() ) return false;
        final FieldWrapper that = ( FieldWrapper ) o;
        return Objects.equals( this.name, that.name ) &&
                Objects.equals( this.status, that.status ) &&
                Objects.equals( this.upstreamString, that.upstreamString ) &&
                Objects.equals( this.downstreamString, that.downstreamString );
    }

    @Override
    public int hashCode() {
        return Objects.hash( this.name, this.status, this.upstreamString, this.downstreamString );
    }

    @Override
    public String toString() {
        return "FieldWrapper{" +
                "name='" + this.name + '\'' +
                ", status='" + this.status + '\'' +
                ", upstreamString='" + this.upstreamString + '\'' +
                ", downstreamString='" + this.downstreamString + '\'' +
                '}';
    }
}
