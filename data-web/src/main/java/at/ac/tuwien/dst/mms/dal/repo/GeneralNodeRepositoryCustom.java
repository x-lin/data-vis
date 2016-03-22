package at.ac.tuwien.dst.mms.dal.repo;

import java.util.List;
import java.util.Map;

/**
 * Created by XLin on 17.03.2016.
 */
public interface GeneralNodeRepositoryCustom {
	Iterable<Map<String, Object>> findNeighbors(String key, boolean upstream, boolean downstream, List<String> excluded,
												List<String> priority, Integer limit, List<String> type);
}
