package at.ac.tuwien.dst.mms.jama.extract.rest.message.model;

import java.io.Serializable;
import java.util.Objects;

/**
 * Created by XLin on 04.03.2016.
 */
public class ParentWrapper implements Serializable {
    private Long item;

    public Long getItem() {
        return this.item;
    }

    @Override
    public boolean equals( final Object o ) {
        if ( this == o ) return true;
        if ( o == null || getClass() != o.getClass() ) return false;
        final ParentWrapper that = ( ParentWrapper ) o;
        return Objects.equals( this.item, that.item );
    }

    @Override
    public int hashCode() {
        return Objects.hash( this.item );
    }

    @Override
    public String toString() {
        return "ParentWrapper{" +
                "item=" + this.item +
                '}';
    }
}
