package at.ac.tuwien.dst.mms.dal;

import at.ac.tuwien.dst.mms.dal.query.model.Neighbors;
import at.ac.tuwien.dst.mms.dal.query.model.ProjectSchema;
import at.ac.tuwien.dst.mms.dal.query.model.TestCoverage;

import java.util.List;
import java.util.Map;

/**
 * Created by xlin on 10.01.2016.
 */
public interface DataReader<T> {
	List<T> findAll();

	List<T> findAll(Integer limit);

	List<T> findMatchingByNeighborKey(String property, String value);

	List<T> findMatchingByNeighborKey(String property, String value, int limit);

	Iterable<Map<String,Object>> findAllMatching(String key, int limit);

	Iterable<Map<String,Object>> findAllMatching(String key);

	T find(String indexAttribute);

	Long count();

	Neighbors getNeighbors(String indexAttribute);

	Neighbors getNeighbors(String indexAttribute, int limit);

	Neighbors getNeighbors(String key, boolean upstream, boolean downstream, List priority, List excluded, Integer limit);

	ProjectSchema getSchema(String key);

	ProjectSchema getSchema(String key, String relation);

	List<TestCoverage> getTestCoverage(String projectKey);
}
