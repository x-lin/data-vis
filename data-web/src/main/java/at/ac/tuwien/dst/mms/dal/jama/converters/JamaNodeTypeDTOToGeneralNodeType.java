package at.ac.tuwien.dst.mms.dal.jama.converters;

import at.ac.tuwien.dst.mms.dal.DataConverter;
import at.ac.tuwien.dst.mms.dal.jama.dto.JamaNodeTypeDTO;
import at.ac.tuwien.dst.mms.dal.repo.GeneralNodeTypeRepository;
import at.ac.tuwien.dst.mms.model.GeneralNodeType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by XLin on 10.03.2016.
 */
@Service
public class JamaNodeTypeDTOToGeneralNodeType implements DataConverter<JamaNodeTypeDTO, GeneralNodeType> {
	@Autowired
	private GeneralNodeTypeRepository generalNodeTypeRepository;

	@Override
	public GeneralNodeType convert(JamaNodeTypeDTO sourceObject) {
		GeneralNodeType nodeType = generalNodeTypeRepository.findByKey(sourceObject.getKey());

		if (nodeType == null) {
			nodeType = new GeneralNodeType();
			nodeType.setKey(sourceObject.getKey());
			nodeType.setName(sourceObject.getName());
			nodeType.setJamaId(sourceObject.getJamaId());
		}

		return nodeType;
	}

	@Override
	public GeneralNodeType convert(JamaNodeTypeDTO sourceObject, GeneralNodeType targetObject) {
		return null;
	}
}
