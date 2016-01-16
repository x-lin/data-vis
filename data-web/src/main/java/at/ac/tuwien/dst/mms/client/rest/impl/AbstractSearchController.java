package at.ac.tuwien.dst.mms.client.rest.impl;

import at.ac.tuwien.dst.mms.client.rest.SearchController;
import at.ac.tuwien.dst.mms.dal.DataReader;
import at.ac.tuwien.dst.mms.util.Config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
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
	public List<T> getAllMatching(
			@PathVariable String string,
			@RequestParam(required = false, defaultValue = Config.REPO_LIMIT_STRING) Integer limit) {
		return reader.findAllMatching("*" + string + "*", limit);
	}

	@Override
	public List<T> getAllStartingWith(
			@PathVariable String string,
			@RequestParam(required = false, defaultValue = Config.REPO_LIMIT_STRING) Integer limit) {
		return reader.findAllMatching(string + "*", limit);
	}

	@Override
	public Long countAll() {
		return reader.count();
	}

	@Override
	public Map<String, List<Object>> getNeighbors(
			@PathVariable String key,
			@RequestParam(required = false, defaultValue = Config.REPO_LIMIT_STRING) Integer limit) {
		return reader.getNeighbors(key, limit);
	}

	@Override
	public List<T> getByNeighborKey(
			@RequestParam String key,
			@RequestParam String value,
			@RequestParam(required = false, defaultValue = Config.REPO_LIMIT_STRING) Integer limit) {
		return reader.findMatchingByNeighborKey(key, value, limit);
	}

	protected DataReader<T> getRepositoryReader() {
		return this.reader;
	}
}
