package at.ac.tuwien.dst.mms.jama.model;

import at.ac.tuwien.dst.mms.jama.rest.StatusLookupRegistry;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

/**
 *
 * @author XLin
 */
public class FieldWrapper implements Serializable {
	private String name;

	private String status;

	@JsonProperty("text8")
	private String upstreamString;

	@JsonProperty("text9")
	private String downstreamString;

	public String getName() {
		return name;
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
