package at.ac.tuwien.dst.mms.dal.impl;

import at.ac.tuwien.dst.mms.dal.query.model.Neighbors;
import at.ac.tuwien.dst.mms.dal.query.model.ProjectSchema;
import at.ac.tuwien.dst.mms.dal.query.model.TestCoverage;
import at.ac.tuwien.dst.mms.dal.repo.ProjectRepository;
import at.ac.tuwien.dst.mms.dal.util.RepositoryService;
import at.ac.tuwien.dst.mms.dal.util.RepositoryUtils;
import at.ac.tuwien.dst.mms.model.ModelEntity;
import at.ac.tuwien.dst.mms.model.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.template.Neo4jOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

	@Transactional
	@Override
	public ProjectSchema getSchema(String key) {
		ProjectSchema schema = new ProjectSchema();
		ProjectRepository repo = (ProjectRepository)this.getRepository();

		schema.setEdges(repo.getEdgeSchema(key));
		schema.setNodes(repo.getNodeSchema(key));

		return schema;
	}

	@Transactional
	@Override
	public ProjectSchema getSchema(String key, String relation) {
		ProjectSchema schema = new ProjectSchema();
		ProjectRepository repo = (ProjectRepository)this.getRepository();

		schema.setEdges(repo.getEdgeSchema(key, relation));
		schema.setNodes(repo.getNodeSchema(key, relation));

		return schema;
	}

	@Transactional
	@Override
	public List<TestCoverage> getTestCoverage(String projectKey) {
		ProjectRepository repo = (ProjectRepository)this.getRepository();
		List<TestCoverage> testCoverage = repo.getTestCoverage(projectKey);

		return testCoverage;
	}

	@Autowired
	protected Neo4jOperations neo4jOperations;

	@Override
	@Transactional
	public Neighbors getNeighbors(String key, boolean upstream, boolean downstream, List priority, List excluded, Integer limit) {
		Project node = this.find(key);
		Iterable<Map<String, Object>> nodes = ((ProjectRepository)this.getRepository()).findNeighbors(key, upstream, downstream, excluded, priority, limit);

		List<ModelEntity> neighbors = this.getNeighbors(nodes);

		Neighbors returnVal = new Neighbors();
		returnVal.setNode(node);
		returnVal.setNeighbors(neighbors);

		return returnVal;
	}

	@Override
	@Transactional
	public Neighbors getNeighbors(String key, int limit) {
		Project node = this.find(key);
		List<String> priority = new ArrayList<>();
		//priority.add("FEAT");
		priority.add("CSC");

		List<String> excluded = new ArrayList<>();
		excluded.add("SSS");
		excluded.add("TC");
		excluded.add("STD");
		excluded.add("BUG");

		Iterable<Map<String, Object>> nodes = ((ProjectRepository)this.getRepository()).findNeighbors(key, true, true, excluded, priority, 20);

//		List<ModelEntity> neighbors = this.getNeighbors(node.getNeighborsLimited());
		List<ModelEntity> neighbors = this.getNeighbors(nodes);

		Neighbors returnVal = new Neighbors();
		returnVal.setNode(node);
		returnVal.setNeighbors(neighbors);

		return returnVal;
	}
}