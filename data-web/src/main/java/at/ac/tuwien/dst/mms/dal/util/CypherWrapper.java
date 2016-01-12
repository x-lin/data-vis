package at.ac.tuwien.dst.mms.dal.util;

/**
 * Created by xlin on 12.01.2016.
 */
public class CypherWrapper {
	public static String wrapLike(String string) {
		return "(?i)" + string + ".*";
	}
}
