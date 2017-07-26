package at.ac.tuwien.dst.mms.jama.rest;

import at.ac.tuwien.dst.mms.jama.model.Activity;
import at.ac.tuwien.dst.mms.jama.model.ObjectType;
import at.ac.tuwien.dst.mms.jama.util.Config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by XLin on 21.04.2016.
 */
@Service
public class JamaActivitiesExtractor {
	@Autowired
	private JamaListExtractor extractor;

	public List<Activity> getActivities(Long projectId, Date dateFrom, Date dateTo) {
		URI uri = getURI(projectId, dateFrom, dateTo);
		return extractor.getList(uri);
	}

	public URI getURI(Long projectId, Date dateFrom, Date dateTo) {
		UriComponentsBuilder builder = UriComponentsBuilder
				.fromHttpUrl(Config.HOST + "/activities")
				.queryParam("project", projectId)
				.queryParam("objectType", ObjectType.ITEM)
				.queryParam("objectType", ObjectType.RELATIONSHIP);

		if (dateTo != null) {
			builder.queryParam("date", dateToString(dateTo));
		}

		if(dateFrom != null) {
			builder.queryParam("date", dateToString(dateFrom));
		}

		return builder.build().encode().toUri();
	}

	private static String dateToString(Date date) {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
		return df.format(date);
	}
}
