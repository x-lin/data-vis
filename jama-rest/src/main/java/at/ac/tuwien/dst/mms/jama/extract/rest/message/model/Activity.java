package at.ac.tuwien.dst.mms.jama.extract.rest.message.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;
import java.util.Objects;

/**
 * Created by XLin on 21.04.2016.
 */
public class Activity {
    @JsonProperty( "item" )
    private long itemId;

    private Date date;

    private EventType eventType;

    private ObjectType objectType;

    public long getItemId() {
        return this.itemId;
    }

    public Date getDate() {
        return this.date;
    }

    public ObjectType getObjectType() {
        return this.objectType;
    }

    public EventType getEventType() {
        return this.eventType;
    }

    @Override
    public boolean equals( final Object o ) {
        if ( this == o ) return true;
        if ( o == null || getClass() != o.getClass() ) return false;
        final Activity activity = ( Activity ) o;
        return this.itemId == activity.itemId &&
                Objects.equals( this.date, activity.date ) &&
                this.eventType == activity.eventType &&
                this.objectType == activity.objectType;
    }

    @Override
    public int hashCode() {
        return Objects.hash( this.itemId, this.date, this.eventType, this.objectType );
    }

    @Override
    public String toString() {
        return "Activity{" +
                "itemId=" + this.itemId +
                ", date=" + this.date +
                ", eventType=" + this.eventType +
                ", objectType=" + this.objectType +
                '}';
    }
}
