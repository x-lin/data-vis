package at.ac.tuwien.dst.mms.jama.extract.rest.message.model;

import java.util.Objects;

/**
 * Created by XLin on 14.03.2016.
 */
public final class Status {
    private String name;

    public String getName() {
        return this.name;
    }

    @Override
    public boolean equals( final Object o ) {
        if ( this == o ) return true;
        if ( o == null || getClass() != o.getClass() ) return false;
        final Status status = ( Status ) o;
        return Objects.equals( this.name, status.name );
    }

    @Override
    public int hashCode() {
        return Objects.hash( this.name );
    }

    @Override
    public String toString() {
        return "Status{" +
                "name='" + this.name + '\'' +
                '}';
    }
}
