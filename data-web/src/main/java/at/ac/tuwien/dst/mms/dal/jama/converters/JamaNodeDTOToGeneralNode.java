package at.ac.tuwien.dst.mms.dal.jama.converters;

import at.ac.tuwien.dst.mms.dal.IndexWriter;
import at.ac.tuwien.dst.mms.dal.DataConverter;
import at.ac.tuwien.dst.mms.dal.jama.dto.JamaNodeDTO;
import at.ac.tuwien.dst.mms.dal.repo.ProjectRepository;
import at.ac.tuwien.dst.mms.model.GeneralNode;
import at.ac.tuwien.dst.mms.model.TextIndex;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * Created by XLin on 25.04.2016.
 */
@Service
public class JamaNodeDTOToGeneralNode implements DataConverter<JamaNodeDTO, GeneralNode> {
	@Autowired
	JamaNodeTypeDTOToGeneralNodeType typeConverter;

	@Autowired
	ProjectRepository projectRepository;

	@Autowired
	IndexWriter indexWriter;

	@Override
	public GeneralNode convert(JamaNodeDTO object) {
		GeneralNode gn = new GeneralNode();
		gn.setProject(projectRepository.findByJamaId(object.getProjectId()));
		gn.setJamaId(object.getJamaId());
		gn.setJamaParentId(object.getJamaParentId());
		gn.setName(object.getName());
		gn.setKey(object.getKey());
		gn.setTextIndex(addIndices(object));
		gn.setType(typeConverter.convert(object.getType()));

		return gn;
	}

	@Override
	public GeneralNode convert(JamaNodeDTO sourceObject, GeneralNode targetObject) {
		targetObject.setName(sourceObject.getName());
		targetObject.setStatus(sourceObject.getStatus());
		targetObject.setJamaParentId(sourceObject.getJamaParentId());
		targetObject.setType(typeConverter.convert(sourceObject.getType()));

		//TODO update text index

		return targetObject;
	}

	private Set<TextIndex> addIndices(JamaNodeDTO dto) {
		List<String> toIndex = new ArrayList<>();
		toIndex.add(dto.getName());
		toIndex.add(dto.getKey());

		return indexWriter.create(toIndex);
	}
}
