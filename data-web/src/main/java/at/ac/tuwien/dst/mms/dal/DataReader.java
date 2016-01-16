package at.ac.tuwien.dst.mms.dal;

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

	List<T> findAllMatching(String key, int limit);

	List<T> findAllMatching(String key);

	T find(String indexAttribute);

	Long count();

	Map<String, List<Object>> getNeighbors(String indexAttribute);

	Map<String, List<Object>> getNeighbors(String indexAttribute, int limit);
}
