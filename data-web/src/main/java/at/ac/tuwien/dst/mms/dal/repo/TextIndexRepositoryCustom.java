package at.ac.tuwien.dst.mms.dal.repo;

import java.util.Map;

/**
 * Created by XLin on 21.03.2016.
 */
public interface TextIndexRepositoryCustom {
	Iterable<Map<String, Object>> findBySearchText(String searchText, int limit);
}
