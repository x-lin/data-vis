package at.ac.tuwien.dst.mms.dal.util;

import at.ac.tuwien.dst.mms.dal.jama.dto.JamaRelationshipDTO;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by XLin on 07.03.2016.
 */
@Service
public class RelationshipTempStorage {
	private Map<Integer, List<JamaRelationshipDTO>> relationships;

	public RelationshipTempStorage() {
		this.relationships = new HashMap<>();
	}

	public void add(Integer projectId, List<JamaRelationshipDTO> relationships) {
		this.relationships.put(projectId, relationships);
	}

	public List<JamaRelationshipDTO> remove(Integer projectId) {
		return this.relationships.remove(projectId);
	}
}
