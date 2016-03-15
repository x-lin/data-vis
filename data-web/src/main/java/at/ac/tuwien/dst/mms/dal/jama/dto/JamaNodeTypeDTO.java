package at.ac.tuwien.dst.mms.dal.jama.dto;

/**
 * Created by XLin on 10.03.2016.
 */
public class JamaNodeTypeDTO {
	Integer jamaId;

	String key;

	String name;

	public Integer getJamaId() {
		return jamaId;
	}

	public String getKey() {
		return key;
	}

	public String getName() {
		return name;
	}

	@Override
	public String toString() {
		return "JamaNodeTypeDTO{" +
				"jamaId=" + jamaId +
				", key='" + key + '\'' +
				", name='" + name + '\'' +
				'}';
	}
}
