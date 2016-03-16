package at.ac.tuwien.dst.mms.dal.impl;

import at.ac.tuwien.dst.mms.dal.query.model.*;
import at.ac.tuwien.dst.mms.dal.repo.ProjectRepository;
import at.ac.tuwien.dst.mms.dal.util.RepositoryService;
import at.ac.tuwien.dst.mms.dal.util.RepositoryUtils;
import at.ac.tuwien.dst.mms.model.GeneralNodeType;
import at.ac.tuwien.dst.mms.model.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.template.Neo4jOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

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

		schema.setEdges(this.getEdgeSchema(repo.getEdgeSchema(key)));
		schema.setNodes(this.getNodeSchema(repo.getNodeSchema(key)));

		return schema;
	}

	@Transactional
	@Override
	public ProjectSchema getSchema(String key, String relation) {
		ProjectSchema schema = new ProjectSchema();
		ProjectRepository repo = (ProjectRepository)this.getRepository();

		schema.setEdges(this.getEdgeSchema(repo.getEdgeSchema(key, relation)));
		schema.setNodes(this.getNodeSchema(repo.getNodeSchema(key, relation)));

		return schema;
	}

	@Transactional
	@Override
	public List<TestCoverage> getTestCoverage(String projectKey) {
		ProjectRepository repo = (ProjectRepository)this.getRepository();

		List<TestCoverageQueryResult> testCoverage = repo.getTestCoverage(projectKey);

		System.out.println("got test coverage");
		Map<String, TestCoverage> testCoverageConv = new HashMap<>();

//		List<TestCoverage> testCoverageConv = new ArrayList<>();

		for(TestCoverageQueryResult coverage : testCoverage) {
			if(testCoverageConv.containsKey(coverage.getKey())) {
				TestCoverage cov = testCoverageConv.get(coverage.getKey());

				if(coverage.getTestcase() != null) {
					cov.addTestcase(coverage.getTestcase());
				}

			} else {
				TestCoverage cov = new TestCoverage();
				cov.setKey(coverage.getKey());
				cov.setType(coverage.getType());
				cov.setName(coverage.getName());
				cov.setNode(coverage.getNode());
				if(coverage.getTestcase() != null) {
					cov.addTestcase(coverage.getTestcase());
				}

				testCoverageConv.put(cov.getKey(), cov);
			}
		}

		return new ArrayList<>(testCoverageConv.values());
	}

	@Autowired
	protected Neo4jOperations neo4jOperations;

	private List<NodeSchemaObject>  getNodeSchema(Iterable<Map<String, Object>> input) {
		List<NodeSchemaObject> schema = new ArrayList<>();

		if(input != null) {
			for (Map<String, Object> entry : input) {
				NodeSchemaObject schemaRow = new NodeSchemaObject();

				for (Map.Entry<String, Object> column : entry.entrySet()) {
					String key = column.getKey();
					Object value = column.getValue();

					switch (key) {
						case "node":
							GeneralNodeType node = neo4jOperations.convert(column.getValue(), GeneralNodeType.class);
							schemaRow.setName(node.getName());
							schemaRow.setKey(node.getKey());
							break;
						case "count":
							schemaRow.setCount(Integer.parseInt(value.toString()));
							break;
						default:
							logger.warn("No mapping found for key " + key);
					}
				}

				schema.add(schemaRow);
			}
		}

		return schema;
	}

	private List<EdgeSchemaObject> getEdgeSchema(Iterable<Map<String, Object>> input) {
		List<EdgeSchemaObject> schema = new ArrayList<>();

		if(input != null) {
			for (Map<String, Object> entry : input) {
				EdgeSchemaObject schemaRow = new EdgeSchemaObject();

				for (Map.Entry<String, Object> column : entry.entrySet()) {
					String key = column.getKey();
					Object value = column.getValue();

					switch (key) {
						case "edgeType":
							schemaRow.setEdgeType(value.toString());
							break;
						case "count":
							schemaRow.setCount(Integer.parseInt(value.toString()));
							break;
						case "source":
							schemaRow.setSource(value.toString());
							//schemaRow.setSource(neo4jOperations.convert(column.getValue(), GeneralNodeType.class));
							break;
						case "target":
							schemaRow.setTarget(value.toString());
							//schemaRow.setTarget(neo4jOperations.convert(column.getValue(), GeneralNodeType.class));
							break;
						default:
							logger.warn("No mapping found for key " + key);
					}
				}

				schema.add(schemaRow);
			}
		}

		return schema;
	}
}