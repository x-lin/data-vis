package at.ac.tuwien.dst.mms.dal.impl;

import at.ac.tuwien.dst.mms.dal.GeneralNodeDataReader;
import at.ac.tuwien.dst.mms.dal.query.model.*;
import at.ac.tuwien.dst.mms.dal.repo.GeneralNodeRepository;
import at.ac.tuwien.dst.mms.model.GeneralNode;
import at.ac.tuwien.dst.mms.model.NodeType;
import org.neo4j.graphdb.Label;
import org.neo4j.graphdb.Node;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by xlin on 15.01.2016.
 */
@Service
public class GeneralNodeRepositoryReader extends AbstractRepositoryReader<GeneralNode> implements GeneralNodeDataReader {
	@Override
	public List<GeneralNode> findAll(Integer limit) {
		return ((GeneralNodeRepository)this.getRepository()).findAll(limit);
	}

	@Override
	public List<GeneralNode> findMatchingByNeighborKey(String property, String keyValue, int limit) {
		return null;
	}

	@Override
	public GeneralNode find(String key) {
		return ((GeneralNodeRepository)this.getRepository()).findByKey(key);
	}

	@Override
	@Transactional
	public Neighbors getNeighbors(String key, boolean upstream, boolean downstream, List priority, List excluded, Integer limit, List type) {
		GeneralNode node = this.find(key);
		node.setCount(((GeneralNodeRepository)this.getRepository()).countNeighbors(key));

		Iterable<Map<String, Object>> nodes = ((GeneralNodeRepository)this.getRepository()).findNeighbors(key, upstream, downstream, excluded, priority, limit, type);
		List<Map<String, Object>> neighbors = this.getNeighbors(nodes);

		Neighbors returnVal = new Neighbors();
		returnVal.setNode(node);
		returnVal.setNeighbors(neighbors);

		return returnVal;
	}

	@Transactional
	@Override
	public List<TestCoverage> getTestCoverage(String projectKey) {
		GeneralNodeRepository repo = (GeneralNodeRepository)this.getRepository();
		List<TestCoverage> testCoverage = repo.getTestCoverage(projectKey);

		return testCoverage;
	}

	@Override
	@Transactional
	public List<NeighborType> getNeighborTypes(String key) {
		return ((GeneralNodeRepository)this.getRepository()).getNeighborTypes(key);
	}

	@Override
	@Transactional
	public List<Map<String, Object>> getNeighborsSingle(String key) {
		GeneralNode node = this.find(key);
		node.setCount(((GeneralNodeRepository)this.getRepository()).countNeighbors(key));

		Iterable<Map<String, Object>> nodes = ((GeneralNodeRepository)this.getRepository()).findNeighborsSingle(key);
		List<Map<String, Object>> neighbors = this.getNeighbors(nodes);

		return neighbors;
	}

	@Override
	public List<BugCoverage> getBugCoverage(String key) {
		return ((GeneralNodeRepository)this.getRepository()).getBugCoverage(key);
	}

	@Override
	@Transactional
	public List<Map<String, Object>> getNodesAndNeighborKeys(List keys) {
		Iterable<Map<String, Object>> nodes = ((GeneralNodeRepository)this.getRepository()).findNodesAndNeighborKeys(keys);
		List<Map<String, Object>> neighbors = this.getNodesAndNeighbors(nodes);

		return neighbors;
	}

	@Transactional
	protected List<Map<String, Object>> getResult(Iterable<Map<String, Object>> input) {
		List<Map<String, Object>> results = new ArrayList<>();

		if (input != null) {
			for (Map<String, Object> row : input) {
				Map<String, Object> map = new HashMap<>();
				for (String key : row.keySet()) {
					GeneralNode node = neo4jOperations.convert(row.get(key), GeneralNode.class);
					map.put(key, node);
				}

				results.add(map);
			}
		}

		return results;
	}

	@Transactional
	protected List<Map<String, Object>> getNodesAndNeighbors(Iterable<Map<String, Object>> nodesWithNeighbors) {
		List<Map<String, Object>> results = new ArrayList<>();
		//List<NodeWithNeighborKeys> res = new ArrayList<>();

		if(nodesWithNeighbors != null) {
			for(Map<String, Object> entry : nodesWithNeighbors) {
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

					} else if(key.equals("neighbors")) {
						map.put("count", ((List)entry.get(key)).size());
						map.put("neighbors", entry.get(key));
					}
				}

				results.add(map);
			}
		}

		return results;
	}

	@Override
	@Transactional
	public List<Map<String,Object>> getByQueryBuilder(QueryGraph graph) {
		Iterable<Map<String, Object>> it = ((GeneralNodeRepository)this.getRepository()).findByQueryBuilder(graph.getSource(), graph.getNodes(), graph.getEdges());
		List<Map<String, Object>> result = this.getResult(it);
		return result;
	}
}
