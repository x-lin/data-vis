package at.ac.tuwien.dst.mms.db.model;

import org.springframework.data.annotation.Transient;

/**
 * Wrapper class to get entities under a common type and to provide common methods.
 * Note that this class should not contain a @NodeEntity annotation,
 * otherwise Spring will persist the data as both this type and its concrete subtype.
*/
public abstract class ModelEntity {
	@Transient
	private long count;

	public long getCount() {
		return count;
	}

	public void setCount(long count) {
		this.count = count;
	}
}
