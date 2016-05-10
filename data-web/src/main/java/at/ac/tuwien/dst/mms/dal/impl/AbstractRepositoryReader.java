package at.ac.tuwien.dst.mms.dal.impl;

import at.ac.tuwien.dst.mms.dal.DataReader;
import at.ac.tuwien.dst.mms.dal.query.model.SearchResult;
import at.ac.tuwien.dst.mms.dal.repo.TextIndexRepository;
import at.ac.tuwien.dst.mms.model.GeneralNode;
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

	@Autowired
	protected TextIndexRepository textIndexRepository;

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
	public SearchResult findAllMatching(String key) {
		return findAllMatching(key, Config.REPO_LIMIT, 0);
	}

	@Override
	public SearchResult findAllMatching(String key, int limit, int startAt) {
		return textIndexRepository.findBySearchText(key, limit, startAt);
	}

	@Override
	public abstract T find(String key);

	@Override
	public Long count() {
		return repository.count();
	}

	public GraphRepository<T> getRepository() {
		return repository;
	}

	@Autowired
	protected Neo4jOperations neo4jOperations;

	@Transactional
	protected List<Map<String, Object>> getNeighbors(Iterable<Map<String, Object>> neighbors) {
		List<Map<String, Object>> results = new ArrayList<>();

		if(neighbors != null) {
			for(Map<String, Object> entry : neighbors) {
				Map<String, Object> map = new HashMap<>();

				for(String key : entry.keySet()) {

					if(key.equals("node")) {
						Node node = neo4jOperations.convert(entry.get(key), Node.class);

						//a node may have multiple labels: check one for one, if the label is mapped to a type
						//until the object was mapped
						for(String prop : node.getPropertyKeys()) {
							if(!prop.equals("count")) {
								map.put(prop, node.getProperty(prop));
							}
						}

						for(Label label : node.getLabels()) {

							if(NodeType.getClass(label.name()) != null) {
								GeneralNode o = (GeneralNode) neo4jOperations.convert(node, NodeType.getClass(label.name()));

								if(o != null) {
									map.put("type", o.getType().getName());
									map.put("projectId", o.getProjectId());
									break;
								}
							}
						}

					} else if(key.equals("count")) {
						map.put("count", entry.get(key));
					} else if(key.equals("direction")) {
						map.put("direction", entry.get(key));
					}
				}

				results.add(map);
			}
		}

		return results;
	}
}
