package at.ac.tuwien.dst.mms.dal.jama.dto;

/**
 * Created by XLin on 10.03.2016.
 */
public class JamaProjectDTO {
	private String key;

	private String name;

	private Integer jamaId;

	private Integer jamaParentId;

	public String getKey() {
		return key;
	}

	public String getName() {
		return name;
	}

	public Integer getJamaId() {
		return jamaId;
	}

	public Integer getJamaParentId() {
		return jamaParentId;
	}

	@Override
	public String toString() {
		return "JamaProjectDTO{" +
				"key='" + key + '\'' +
				", name='" + name + '\'' +
				", jamaId=" + jamaId +
				", jamaParentId=" + jamaParentId +
				'}';
	}
}
