package at.ac.tuwien.dst.mms.dal.impl;

import at.ac.tuwien.dst.mms.dal.repo.GeneralNodeRepository;
import at.ac.tuwien.dst.mms.dal.util.RepositoryService;
import at.ac.tuwien.dst.mms.dal.util.RepositoryUtils;
import at.ac.tuwien.dst.mms.model.GeneralNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by xlin on 15.01.2016.
 */
@Service
public class GeneralNodeRepositoryReader extends AbstractRepositoryReader<GeneralNode> {

	@Autowired
	RepositoryService repositoryService;

//	@Override
//	public List<Issue> findAll(Integer limit) {
//		return ((IssueRepository)this.getRepository()).
//
//		logger.info("in findAll limit");
//		logger.info(limit.toString());
//		Page<T> page = repository.findAll(RepositoryUtils.getResultsNr(limit));
//
//		logger.info("total elements" + page.getTotalElements()+"");
//
//		return page.getContent();
//	}

	@Override
	public List<GeneralNode> findAll(Integer limit) {
		return ((GeneralNodeRepository)this.getRepository()).findAll(limit);
	}

	@Override
	public List<GeneralNode> findMatchingByNeighborKey(String property, String keyValue, int limit) {
		return null;
	}

	@Override
	public List<GeneralNode> findAllMatching(String key, int limit) {
		return ((GeneralNodeRepository)this.getRepository()).findAllByKey(key, RepositoryUtils.getResultsNr(limit));
	}

	@Override
	public GeneralNode find(String key) {
		return ((GeneralNodeRepository)this.getRepository()).findByKey(key);
	}
}
