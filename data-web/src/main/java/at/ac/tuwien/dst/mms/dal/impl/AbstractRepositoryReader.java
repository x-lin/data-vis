package at.ac.tuwien.dst.mms.dal.impl;

import at.ac.tuwien.dst.mms.dal.DataReader;
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
import java.util.HashMap;
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
	public Map<String, List<Object>> getNeighbors(String key) {

		return this.getNeighbors(this.find(key).getNeighbors());
	}

	//TODO limit not factored in yet -> map is by default restricted to 20
	@Override
	@Transactional
	public Map<String, List<Object>> getNeighbors(String key, int limit) {
		return this.getNeighbors(this.find(key).getNeighborsLimited());
	}

	public GraphRepository<T> getRepository() {
		return repository;
	}

	@Autowired
	protected Neo4jOperations neo4jOperations;

	@Transactional
	protected Map<String, List<Object>> getNeighbors(Iterable<Map<String, Object>> neighbors) {
		Map<String, List<Object>> result = new HashMap<>();

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
						Object o = neo4jOperations.convert(node, NodeType.getClass(label.name()));

						if(o != null) {
							List<Object> objects;

							if (result.containsKey(label.name())) {
								objects = result.get(label.name());
							} else {
								objects = new ArrayList<>();
								result.put(label.name(), objects);
							}

							objects.add(o);
							break;
						}
					}
				}
			}
		}



		if(result.containsKey("Issue")) {
			List<Object> list = result.remove("Issue");
			result.put("Ticket", list);
		}

		return result;
	}

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
}
