package at.ac.tuwien.dst.mms.dal.repo;

import at.ac.tuwien.dst.mms.model.TextIndex;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;

import java.util.Map;

/**
 * Created by XLin on 21.03.2016.
 */
public class TextIndexRepositoryImpl implements TextIndexRepositoryCustom {
	@Autowired
	private Neo4jTemplate template;

	@Override
	public Iterable<Map<String, Object>> findBySearchText(String searchText, int limit) {
		String concatString = this.concat(this.split(searchText));
		String limitString = limit == -1 ? "" : "LIMIT " + limit;

		String query = "START a=node:" + TextIndex.TEXT_INDEX_KEY_INDEX + "('key: (" + concatString + ")') " +
				"MATCH (a)-[]-(b:Project) " +
				"RETURN b.key AS key, b.name AS name, 'PROJECT' AS typeKey, 'Project' AS type " +
				"LIMIT " + limit + " " +
				"UNION " +
				"START a=node:" + TextIndex.TEXT_INDEX_KEY_INDEX + "('key: (" + concatString + ")') " +
				"MATCH (a)-[]-(b:GeneralNode)-[:NODE_TYPE]-(c) " +
				"WHERE (NOT EXISTS(b.jiraStatus) OR b.jiraStatus <> 'Closed') " +
				"RETURN b.key AS key, b.name AS name, c.key AS typeKey, c.name AS type " +
				limitString;

		return template.query(query, null);
	}

	private String[] split(String searchText) {
		String[] tokens = searchText.split(" ");
		tokens[tokens.length-1] = tokens[tokens.length-1] + "*";

		return tokens;
	}

	private String concat(String[] tokens) {
		String concatString = "";

		for(String token : tokens) {
			concatString += token + " AND ";
		}

		concatString = concatString.substring(0, concatString.length() - 4);

		return concatString;
	}
}
