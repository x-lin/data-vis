package at.ac.tuwien.dst.mms.dal.util;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

/**
 * Created by xlin on 15.01.2016.
 */
public class RepositoryUtils {
	public static Pageable getTen() {
		return getResultsNr(10);
	}

	public static Pageable getHundred() {
		return getResultsNr(100);
	}

	public static Pageable getResultsNr(int limit){
		return new PageRequest(0, limit);
	}

	public static String wrapStartingWith(String string) {
		return string + "*";
	}
}
