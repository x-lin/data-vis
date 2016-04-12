package at.ac.tuwien.dst.mms.dal.impl;

import at.ac.tuwien.dst.mms.dal.GeneralNodeDataReader;
import at.ac.tuwien.dst.mms.dal.query.model.NeighborType;
import at.ac.tuwien.dst.mms.dal.query.model.Neighbors;
import at.ac.tuwien.dst.mms.dal.query.model.TestCoverage;
import at.ac.tuwien.dst.mms.dal.repo.GeneralNodeRepository;
import at.ac.tuwien.dst.mms.model.GeneralNode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
