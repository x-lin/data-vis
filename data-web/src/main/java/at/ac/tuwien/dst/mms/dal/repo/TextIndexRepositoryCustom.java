package at.ac.tuwien.dst.mms.dal.repo;

import at.ac.tuwien.dst.mms.dal.query.model.SearchResult;

/**
 * Created by XLin on 21.03.2016.
 */
public interface TextIndexRepositoryCustom {
	SearchResult findBySearchText(String searchText, int limit, int startAt);

	Integer countSearchText(String searchText);
}
