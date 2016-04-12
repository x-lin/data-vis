package at.ac.tuwien.dst.mms.dal.impl;

import at.ac.tuwien.dst.mms.dal.ProjectDataReader;
import at.ac.tuwien.dst.mms.dal.query.model.NeighborType;
import at.ac.tuwien.dst.mms.dal.query.model.Neighbors;
import at.ac.tuwien.dst.mms.dal.query.model.ProjectSchema;
import at.ac.tuwien.dst.mms.dal.query.model.TestCoverage;
import at.ac.tuwien.dst.mms.dal.repo.ProjectRepository;
import at.ac.tuwien.dst.mms.model.Project;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * Created by xlin on 15.01.2016.
 */
@Service
public class ProjectRepositoryReader extends AbstractRepositoryReader<Project> implements ProjectDataReader {
	@Override
	public List<Project> findAll(Integer limit) {
		return ((ProjectRepository)this.getRepository()).findAll(limit);
	}

	@Override
	public List<Project> findMatchingByNeighborKey(String key, String keyValue, int limit) {
		List<Project> projectWrapper = null;

		return projectWrapper;
	}

	@Override
	public Project find(String key) {
		return ((ProjectRepository)this.getRepository()).findByKey(key);
	}

	@Transactional
	public ProjectSchema getSchema(String key) {
		ProjectSchema schema = new ProjectSchema();
		ProjectRepository repo = (ProjectRepository)this.getRepository();

		schema.setEdges(repo.getEdgeSchema(key));
		schema.setNodes(repo.getNodeSchema(key));

		return schema;
	}

	@Transactional
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

	@Override
	@Transactional
	public Neighbors getNeighbors(String key, boolean upstream, boolean downstream, List priority, List excluded, Integer limit, List type) {
		Project node = this.find(key);
		node.setCount(((ProjectRepository)this.getRepository()).countNeighbors(key));
		Iterable<Map<String, Object>> nodes = ((ProjectRepository)this.getRepository()).findNeighbors(key, upstream, downstream, excluded, priority, limit, type);

		List<Map<String, Object>> neighbors = this.getNeighbors(nodes);

		Neighbors returnVal = new Neighbors();
		returnVal.setNode(node);
		returnVal.setNeighbors(neighbors);

		return returnVal;
	}

	@Override
	@Transactional
	public List<NeighborType> getNeighborTypes(String key) {
		return ((ProjectRepository)this.getRepository()).getNeighborTypes(key);
	}

	@Override
	@Transactional
	public List<Map<String, Object>>getNeighborsSingle(String key) {
		Iterable<Map<String, Object>> nodes = ((ProjectRepository)this.getRepository()).findNeighborsSingle(key);

		List<Map<String, Object>> neighbors = this.getNeighbors(nodes);


		return neighbors;
	}
}