package at.ac.tuwien.dst.mms.jama.extract.rest.message.response;

import at.ac.tuwien.dst.mms.jama.extract.rest.message.model.*;

import java.util.List;
import java.util.Objects;

/**
 * @author LinX
 */
public abstract class ListResponse<T> {
    private List<T> data;

    private Meta meta;

    public PageInfo getPageInfo() {
        return this.meta.getPageInfo();
    }

    public List<T> getData() {
        return this.data;
    }

    @Override
    public boolean equals( final Object o ) {
        if ( this == o ) return true;
        if ( o == null || getClass() != o.getClass() ) return false;
        final ListResponse<?> that = ( ListResponse<?> ) o;
        return Objects.equals( this.data, that.data ) &&
                Objects.equals( this.meta, that.meta );
    }

    @Override
    public int hashCode() {
        return Objects.hash( this.data, this.meta );
    }

    @Override
    public String toString() {
        return "ListResponse{" +
                "data=" + this.data +
                ", meta=" + this.meta +
                '}';
    }

    public static final class ActivitiesResponse extends ListResponse<Activity> {
    }

    public static final class ItemsResponse extends ListResponse<Item> {
    }

    public static final class ItemTypesResponse extends ListResponse<ItemType> {
    }

    public static final class ProjectsResponse extends ListResponse<Project> {
    }

    public static final class RelationshipsResponse extends ListResponse<Relationship> {
    }
}
