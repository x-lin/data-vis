package at.ac.tuwien.dst.mms.dal.query.model;

import org.springframework.data.neo4j.annotation.QueryResult;
import org.springframework.data.neo4j.annotation.ResultColumn;

/**
 * Created by XLin on 21.03.2016.
 */
@QueryResult
public class TextSearch {
	@ResultColumn("key")
	private String key;

	@ResultColumn("name")
	private String name;

	@ResultColumn("type")
	private String type;

	@ResultColumn("typeKey")
	private String typeKey;
}
