package at.ac.tuwien.dst.mms.jama.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by XLin on 03.03.2016.
 */
public class Project {
	Long jamaId;

	Integer parentId;

	@JsonProperty
	Boolean isFolder;

	String key;

	@JsonProperty("jamaId")
	public Long getJamaId() {
		return jamaId;
	}

	@JsonProperty("id")
	public void setJamaId(Long id) {
		jamaId = id;
	}

	@JsonProperty("jamaParentId")
	public Integer getParentId() {
		return parentId;
	}

	@JsonProperty("parent")
	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	@JsonIgnore
	public Boolean getFolder() {
		return isFolder;
	}

	@JsonProperty("key")
	public String getKey() {
		return key;
	}

	@JsonProperty("projectKey")
	public void setKey(String key) {
		this.key = key;
	}

	@Override
	public String toString() {
		return "Project{" +
				"jamaId=" + jamaId +
				", parentId=" + parentId +
				", isFolder=" + isFolder +
				", key='" + key + '\'' +
				'}';
	}
}
