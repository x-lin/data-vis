package at.ac.tuwien.dst.mms.jama.extract.rest.message.model;

import java.util.Objects;

/**
 * Created by XLin on 03.03.2016.
 */
public final class Meta {
    private PageInfo pageInfo;

    public PageInfo getPageInfo() {
        return this.pageInfo;
    }

    @Override
    public boolean equals( final Object o ) {
        if ( this == o ) return true;
        if ( o == null || getClass() != o.getClass() ) return false;
        final Meta meta = ( Meta ) o;
        return Objects.equals( this.pageInfo, meta.pageInfo );
    }

    @Override
    public int hashCode() {
        return Objects.hash( this.pageInfo );
    }

    @Override
    public String toString() {
        return "Meta{" +
                "pageInfo=" + this.pageInfo +
                '}';
    }
}
