package at.ac.tuwien.dst.mms.dal.jama.dto;

/**
 * Created by XLin on 10.03.2016.
 */
public class JamaNodeDTO {
	private Integer projectId;

	private Long jamaId;

	private Long jamaParentId;

	private String key;

	private JamaNodeTypeDTO type;

	public Integer getProjectId() {
		return projectId;
	}

	public Long getJamaId() {
		return jamaId;
	}

	public Long getJamaParentId() {
		return jamaParentId;
	}

	public String getKey() {
		return key;
	}

	public JamaNodeTypeDTO getType() {
		return type;
	}

	@Override
	public String toString() {
		return "JamaNodeDTO{" +
				"projectId=" + projectId +
				", jamaId=" + jamaId +
				", jamaParentId=" + jamaParentId +
				", key='" + key + '\'' +
				", type=" + type +
				'}';
	}

}
