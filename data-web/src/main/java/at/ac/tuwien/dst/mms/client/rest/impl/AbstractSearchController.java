package at.ac.tuwien.dst.mms.client.rest.impl;

import at.ac.tuwien.dst.mms.client.rest.SearchController;
import at.ac.tuwien.dst.mms.dal.DataReader;
import at.ac.tuwien.dst.mms.dal.query.model.*;
import at.ac.tuwien.dst.mms.util.Config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

/**
 * Created by xlin on 16.01.2016.
 */
public abstract class AbstractSearchController<T> implements SearchController<T> {
	@Autowired
	private DataReader<T> reader;

	@Override
	public Iterable<T> getAll(
			@RequestParam(required = false, defaultValue = Config.REPO_LIMIT_STRING) Integer limit) {
		return reader.findAll(limit);
	}

	@Override
	public T getOne(
			@PathVariable String key) {
		return reader.find(key);
	}

	@Override
	public Iterable<Map<String, Object>> getAllStartingWith(
			@PathVariable String string,
			@RequestParam(required = false, defaultValue = Config.REPO_LIMIT_STRING) Integer limit) {
		return reader.findAllMatching(string, limit);
	}

	@Override
	public Long countAll() {
		return reader.count();
	}

	@Override
	public Neighbors getNeighbors(
			@PathVariable String key,
			@RequestParam(required = false, defaultValue = "true") boolean downstream,
			@RequestParam(required = false, defaultValue = "true") boolean upstream,
			@RequestParam(required = false) List<String> priority,
			@RequestParam(required = false) List<String> excluded,
			@RequestParam(required = false, defaultValue = Config.REPO_LIMIT_STRING) Integer limit,
			@RequestParam(required = false) List<String> type) {
		return reader.getNeighbors(key, upstream, downstream, priority, excluded, limit, type);
	}

	@Override
	public List<Map<String, Object>> getNeighborsSingle(
			@PathVariable String key
	) {
		return reader.getNeighborsSingle(key);
	}

	@Override
	public List<T> getByNeighborKey(
			@RequestParam String key,
			@RequestParam String value,
			@RequestParam(required = false, defaultValue = Config.REPO_LIMIT_STRING) Integer limit) {
		return reader.findMatchingByNeighborKey(key, value, limit);
	}

	@Override
	public List<NeighborType> getNeighborTypes(
			@PathVariable String key
	) {
		return reader.getNeighborTypes(key);
	}

	@Override
	public List<TestCoverage> getTestCoverage(
			@PathVariable String key
	) {
		return reader.getTestCoverage(key);
	}

	@Override
	public List<BugCoverage> getBugCoverage(
			@PathVariable String key
	) {
		return reader.getBugCoverage(key);
	}

	@Override
	public List<Map<String, Object>> synch(
			@RequestParam List<String> key
	) {
		return reader.getNodesAndNeighborKeys(key);
	}

	@Override
	public List<Map<String, Object>> getByQueryBuilder(
			@RequestBody QueryGraph graph
	) {
		return reader.getByQueryBuilder(graph);
	}

	protected DataReader<T> getRepositoryReader() {
		return this.reader;
	}
}
