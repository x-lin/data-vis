package at.ac.tuwien.dst.mms.dal.jama.converters;

import at.ac.tuwien.dst.mms.dal.IndexWriter;
import at.ac.tuwien.dst.mms.dal.DataConverter;
import at.ac.tuwien.dst.mms.dal.jama.dto.JamaProjectDTO;
import at.ac.tuwien.dst.mms.model.Project;
import at.ac.tuwien.dst.mms.model.TextIndex;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * Created by XLin on 10.03.2016.
 */
@Service
public class JamaProjectDTOToProject implements DataConverter<JamaProjectDTO, Project> {
	@Autowired
	IndexWriter indexWriter;

	@Override
	public Project convert(JamaProjectDTO sourceObject) {
		Project project = new Project();
		project.setName(sourceObject.getName());
		project.setKey(sourceObject.getKey());
		project.setJamaId(sourceObject.getJamaId());
		project.setJamaParentId(sourceObject.getJamaParentId());
		project.setTextIndex(this.addIndices(sourceObject));

		return project;
	}

	@Override
	public Project convert(JamaProjectDTO sourceObject, Project targetObject) {
		if (sourceObject.getName() == null) {
			targetObject.setName(sourceObject.getName());
		}

		if(sourceObject.getJamaId() != null && targetObject.getJamaId() == null) {
			targetObject.setJamaId(sourceObject.getJamaId());
			targetObject.setJamaParentId(sourceObject.getJamaParentId());
		}

		//TODO update text index

		return targetObject;
	}

	private Set<TextIndex> addIndices(JamaProjectDTO dto) {
		List<String> toIndex = new ArrayList<>();
		toIndex.add(dto.getName());
		toIndex.add(dto.getKey());

		return indexWriter.create(toIndex);
	}
}
