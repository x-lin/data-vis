package at.ac.tuwien.dst.mms.dal.impl;

import at.ac.tuwien.dst.mms.dal.repo.RequirementRepository;
import at.ac.tuwien.dst.mms.model.Requirement;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by xlin on 15.01.2016.
 */
@Service
public class RequirementRepositoryReader extends AbstractRepositoryReader<Requirement> {
	@Override
	public List<Requirement> findAll(Integer limit) {
		return ((RequirementRepository)this.getRepository()).findAll(limit);
	}

	@Override
	public List<Requirement> findMatchingByNeighborKey(String property, String keyValue, int limit) {
		return null;
	}

	@Override
	public List<Requirement> findAllMatching(String key, int limit) {
		return ((RequirementRepository)this.getRepository()).findAllByKey(key);
	}

	@Override
	public Requirement find(String key) {
		return ((RequirementRepository)this.getRepository()).findByKey(key);
	}
}
