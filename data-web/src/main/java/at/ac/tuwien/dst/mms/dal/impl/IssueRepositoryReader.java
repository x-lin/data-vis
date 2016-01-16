package at.ac.tuwien.dst.mms.dal.impl;

import at.ac.tuwien.dst.mms.dal.repo.IssueRepository;
import at.ac.tuwien.dst.mms.dal.util.RepositoryService;
import at.ac.tuwien.dst.mms.dal.util.RepositoryUtils;
import at.ac.tuwien.dst.mms.model.Issue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by xlin on 15.01.2016.
 */
@Service
public class IssueRepositoryReader extends AbstractRepositoryReader<Issue> {

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
	public List<Issue> findAll(Integer limit) {
		return ((IssueRepository)this.getRepository()).findAll(limit);
	}

	@Override
	public List<Issue> findMatchingByNeighborKey(String property, String keyValue, int limit) {
		List<Issue> issues = null;

		if(property.equals("project")) {
			issues = repositoryService.getProjectRepository().findIssues(keyValue, limit);
		}

		return issues;
	}

	@Override
	public List<Issue> findAllMatching(String key, int limit) {
		return ((IssueRepository)this.getRepository()).findAllByKey(key, RepositoryUtils.getResultsNr(limit));
	}

	@Override
	public Issue find(String key) {
		return ((IssueRepository)this.getRepository()).findByKey(key);
	}
}
