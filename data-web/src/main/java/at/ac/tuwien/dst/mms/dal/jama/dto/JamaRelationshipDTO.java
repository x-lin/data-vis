package at.ac.tuwien.dst.mms.dal.jama.dto;

/**
 * Created by XLin on 07.03.2016.
 */
public class JamaRelationshipDTO {
	private Long from;

	private Long to;

	public Long getFrom() {
		return from;
	}

	public void setFrom(Long from) {
		this.from = from;
	}

	public Long getTo() {
		return to;
	}

	public void setTo(Long to) {
		this.to = to;
	}

	@Override
	public String toString() {
		return "JamaRelationshipDTO{" +
				"from=" + from +
				", to=" + to +
				'}';
	}
}
