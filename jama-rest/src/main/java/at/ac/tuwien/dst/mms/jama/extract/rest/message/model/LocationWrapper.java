package at.ac.tuwien.dst.mms.jama.extract.rest.message.model;

import java.io.Serializable;
import java.util.Objects;

/**
 * Created by XLin on 04.03.2016.
 */
public class LocationWrapper implements Serializable {
    private ParentWrapper parent;

    public Long getItem() {
        return this.parent.getItem();
    }

    @Override
    public boolean equals( final Object o ) {
        if ( this == o ) return true;
        if ( o == null || getClass() != o.getClass() ) return false;
        final LocationWrapper that = ( LocationWrapper ) o;
        return Objects.equals( this.parent, that.parent );
    }

    @Override
    public int hashCode() {
        return Objects.hash( this.parent );
    }

    @Override
    public String toString() {
        return "LocationWrapper{" +
                "parent=" + this.parent +
                '}';
    }
}
