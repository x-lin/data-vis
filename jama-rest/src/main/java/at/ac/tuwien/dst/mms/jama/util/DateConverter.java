package at.ac.tuwien.dst.mms.jama.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by XLin on 25.04.2016.
 */
public class DateConverter {

	public static String dateToString(Date date) {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
		return df.format(date);
	}
}
