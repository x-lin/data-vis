package at.ac.tuwien.dst.mms.jama.extract.rest.message.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.Objects;

/**
 * Created by XLin on 03.03.2016.
 */
public class Project implements Serializable {
    private long id;

    @SerializedName( "parent" )
    private Integer parentId;

    private boolean isFolder;

    @SerializedName( "projectKey" )
    private String key;

    private FieldWrapper fields;

    public long getId() {
        return this.id;
    }

    public Integer getParentId() {
        return this.parentId;
    }

    @JsonIgnore
    public boolean getFolder() {
        return this.isFolder;
    }

    public String getKey() {
        return this.key;
    }

    @JsonProperty
    public String getName() {
        return this.fields.getName();
    }

    public boolean isFolder() {
        return this.isFolder;
    }

    public boolean isProject() {
        return true;
    }

    @Override
    public boolean equals( final Object o ) {
        if ( this == o ) return true;
        if ( o == null || getClass() != o.getClass() ) return false;
        final Project project = ( Project ) o;
        return this.id == project.id &&
                this.isFolder == project.isFolder &&
                Objects.equals( this.parentId, project.parentId ) &&
                Objects.equals( this.key, project.key ) &&
                Objects.equals( this.fields, project.fields );
    }

    @Override
    public int hashCode() {
        return Objects.hash( this.id, this.parentId, this.isFolder, this.key, this.fields );
    }

    @Override
    public String toString() {
        return "Project{" +
                "id=" + this.id +
                ", parentId=" + this.parentId +
                ", isFolder=" + this.isFolder +
                ", key='" + this.key + '\'' +
                ", fields=" + this.fields +
                '}';
    }
}
