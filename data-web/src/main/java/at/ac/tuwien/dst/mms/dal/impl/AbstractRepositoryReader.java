package at.ac.tuwien.dst.mms.dal.impl;

import at.ac.tuwien.dst.mms.dal.DataReader;
import at.ac.tuwien.dst.mms.dal.query.model.Neighbors;
import at.ac.tuwien.dst.mms.dal.query.model.ProjectSchema;
import at.ac.tuwien.dst.mms.dal.query.model.TestCoverage;
import at.ac.tuwien.dst.mms.model.ModelEntity;
import at.ac.tuwien.dst.mms.model.NodeType;
import at.ac.tuwien.dst.mms.util.Config;
import org.neo4j.graphdb.Label;
import org.neo4j.graphdb.Node;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.repository.GraphRepository;
import org.springframework.data.neo4j.template.Neo4jOperations;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by xlin on 15.01.2016.
 */
public abstract class AbstractRepositoryReader<T extends ModelEntity> implements DataReader {
	@Autowired
	protected GraphRepository<T> repository;

	@Autowired(required = false)
	protected Logger logger;

	@Override
	@Transactional
	public List<T> findAll() {
		List<T> list = new ArrayList<>();

		for(T entry : repository.findAll()) {
			list.add(entry);
		}

		return list;
	}

	@Override
	public abstract List<T> findAll(Integer limit);

	@Override
	public List<T> findMatchingByNeighborKey(String property, String keyValue) {
		return this.findMatchingByNeighborKey(property, keyValue, Config.REPO_LIMIT);
	}

	@Override
	public abstract List<T> findMatchingByNeighborKey(String property, String keyValue, int limit);

	@Override
	public List<T> findAllMatching(String key) {
		return findAllMatching(key, Config.REPO_LIMIT);
	}

	@Override
	public abstract T find(String key);

	@Override
	public Long count() {
		return repository.count();
	}

	@Override
	public Neighbors getNeighbors(String key) {
		T node = this.find(key);

		List<ModelEntity> neighbors = this.getNeighbors(node.getNeighborsLimited());

		Neighbors returnVal = new Neighbors();
		returnVal.setNode(node);
		returnVal.setNeighbors(neighbors);

		return returnVal;
	}

	//TODO limit not factored in yet -> map is by default restricted to 20
	@Override
	@Transactional
	public Neighbors getNeighbors(String key, int limit) {
		T node = this.find(key);

		List<ModelEntity> neighbors = this.getNeighbors(node.getNeighborsLimited());

		Neighbors returnVal = new Neighbors();
		returnVal.setNode(node);
		returnVal.setNeighbors(neighbors);

		return returnVal;
	}

	public GraphRepository<T> getRepository() {
		return repository;
	}

	@Autowired
	protected Neo4jOperations neo4jOperations;

	@Transactional
	protected List<ModelEntity> getNeighbors(Iterable<Map<String, Object>> neighbors) {
		List<ModelEntity> results = new ArrayList<>();

		if(neighbors != null) {
			for(Map<String, Object> entry : neighbors) {
				//System.out.println("result before: " + result);
				//we know that each return entry is only one object (neighbor node), thus take the first key
				String key = entry.keySet().iterator().next();

				Node node = neo4jOperations.convert(entry.get(key), Node.class);

				//a node may have multiple labels: check one for one, if the label is mapped to a type
				//until the object was mapped
				for(Label label : node.getLabels()) {

					if(NodeType.getClass(label.name()) != null) {
						ModelEntity o = neo4jOperations.convert(node, NodeType.getClass(label.name()));

						if(o != null) {
							results.add(o);
							break;
						}
					}
				}
			}
		}

		return results;
	}

//	@Override
//	public Neighbors getNeighbors(String key, boolean downstream, boolean upstream, List<String> priority, List<String> excluded, Integer limit) {
//		return null;
//	}

	@Override
	public ProjectSchema getSchema(String projectKey) {
		return null;
	}

	@Override
	public ProjectSchema getSchema(String projectKey, String relation) {
		return null;
	}

	@Override
	public List<TestCoverage> getTestCoverage(String projectKey) {
		return null;
	}

	@Override
	public Neighbors getNeighbors(String key, boolean downstream, boolean upstream, List priority, List excluded, Integer limit) {
		return null;
	}
}
