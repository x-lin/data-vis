package at.ac.tuwien.dst.mms.jama.model;

import at.ac.tuwien.dst.mms.jama.rest.StatusLookupRegistry;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by XLin on 03.03.2016.
 */
public class FieldWrapper {
	private String name;

	private String status;

	@JsonProperty("text8")
	private String upstreamString;

	@JsonProperty("text9")
	private String downstreamString;

	public String getName() {
		return name;
	}

	public void setStatus(Integer statusId) {
		status = StatusLookupRegistry.get().getStatusById(statusId);
	}

	public String getStatus() {
		return status;
	}

	public String getUpstreamString() {
		return upstreamString;
	}

	public String getDownstreamString() {
		return downstreamString;
	}
}
