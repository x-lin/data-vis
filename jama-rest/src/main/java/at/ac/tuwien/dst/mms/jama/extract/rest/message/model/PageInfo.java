package at.ac.tuwien.dst.mms.jama.extract.rest.message.model;

import java.util.Objects;
import java.util.Optional;

/**
 * Created by XLin on 03.03.2016.
 */
public final class PageInfo {
    private Integer startIndex;

    private Integer resultCount;

    private Integer totalResults;

    public Optional<Integer> getAndIncrementNextStartIndex() {
        if ( hasNextIteration() ) {
            this.startIndex += this.resultCount;
            return Optional.of( this.startIndex );
        }
        return Optional.empty();
    }

    private boolean hasNextIteration() {
        return this.startIndex + this.resultCount < this.totalResults;
    }

    @Override
    public boolean equals( final Object o ) {
        if ( this == o ) return true;
        if ( o == null || getClass() != o.getClass() ) return false;
        final PageInfo pageInfo = ( PageInfo ) o;
        return Objects.equals( this.startIndex, pageInfo.startIndex ) &&
                Objects.equals( this.resultCount, pageInfo.resultCount ) &&
                Objects.equals( this.totalResults, pageInfo.totalResults );
    }

    @Override
    public int hashCode() {
        return Objects.hash( this.startIndex, this.resultCount, this.totalResults );
    }

    @Override
    public String toString() {
        return "PageInfo{" +
                "startIndex=" + this.startIndex +
                ", resultCount=" + this.resultCount +
                ", totalResults=" + this.totalResults +
                '}';
    }
}
