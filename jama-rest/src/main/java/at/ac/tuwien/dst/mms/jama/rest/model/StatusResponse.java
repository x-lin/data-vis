package at.ac.tuwien.dst.mms.jama.rest.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by XLin on 14.03.2016.
 */
public class StatusResponse {
	@JsonProperty("data")
	Status status;

	public Status getStatus() {
		return status;
	}

	@Override
	public String toString() {
		return "StatusResponse{" +
				"status=" + status +
				'}';
	}
}
