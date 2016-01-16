package at.ac.tuwien.dst.mms.dal.impl;

import at.ac.tuwien.dst.mms.dal.repo.ProjectRepository;
import at.ac.tuwien.dst.mms.dal.util.RepositoryService;
import at.ac.tuwien.dst.mms.dal.util.RepositoryUtils;
import at.ac.tuwien.dst.mms.model.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by xlin on 15.01.2016.
 */
@Service
public class ProjectRepositoryReader extends AbstractRepositoryReader<Project> {

	@Autowired
	RepositoryService repositoryService;

	@Override
	public List<Project> findAll(Integer limit) {
		return ((ProjectRepository)this.getRepository()).findAll(limit);
	}

	@Override
	public List<Project> findMatchingByNeighborKey(String key, String keyValue, int limit) {
		List<Project> projectWrapper = null;

		if(key.equals("issue")) {
			Project project = repositoryService.getIssueRepository().findByKey(keyValue).getProject();
			projectWrapper = new ArrayList<>();
			projectWrapper.add(project);
		}

		return projectWrapper;
	}

	@Override
	public List<Project> findAllMatching(String key, int limit) {
		return ((ProjectRepository)this.getRepository()).findAllByKey(key, RepositoryUtils.getResultsNr(limit));
	}

	@Override
	public Project find(String key) {
		return ((ProjectRepository)this.getRepository()).findByKey(key);
	}
}