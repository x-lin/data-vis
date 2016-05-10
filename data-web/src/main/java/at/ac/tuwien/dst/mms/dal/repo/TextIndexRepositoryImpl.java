package at.ac.tuwien.dst.mms.dal.repo;

import at.ac.tuwien.dst.mms.dal.query.model.SearchResult;
import at.ac.tuwien.dst.mms.model.TextIndex;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.data.neo4j.template.Neo4jOperations;

import java.util.Map;

/**
 * Created by XLin on 21.03.2016.
 */
public class TextIndexRepositoryImpl implements TextIndexRepositoryCustom {
	@Autowired
	private Neo4jTemplate template;

	@Autowired
	private Neo4jOperations neo4jOperations;

	@Override
	public SearchResult findBySearchText(String searchText, int limit, int startAt) {
		String limitString = limit == -1 ? "" : "LIMIT " + limit;

//		String query = this.buildStart(searchText) +
//				"MATCH (a)-[]-(b:Project) " +
//				"RETURN b.key AS key, b.name AS name, 'PROJECT' AS typeKey, 'Project' AS type " +
//				"LIMIT " + limit + " " +
//				"UNION " +
//				this.buildStart(searchText) +
//				"MATCH (a)-[]-(b:GeneralNode)-[:NODE_TYPE]-(c) " +
//				"RETURN b.key AS key, b.name AS name, c.key AS typeKey, c.name AS type " +
//				"SKIP " + startAt + " " +
//				limitString;

		String query = this.buildStart(searchText) +
				"MATCH (a)--(b) OPTIONAL MATCH (b)-[:NODE_TYPE]-(c)" +
				"RETURN b.key AS key, b.name AS name, c.key AS typeKey, c.name AS type " +
				"SKIP " + startAt + " " +
				limitString;

		SearchResult result = new SearchResult();
		result.setCount(this.countSearchText(searchText));
		result.setItems(template.query(query, null));
		result.setStartAt(startAt);

		return result;
	}

	@Override
	public Integer countSearchText(String searchText) {
		String query = this.buildStart(searchText) +
				"MATCH (a)--(g) " +
				"RETURN count(g) ";

		return this.getResult(template.query(query, null));
	}

	protected Integer getResult(Iterable<Map<String, Object>> input) {
		Map<String, Object> row = input.iterator().next();
		String key = row.keySet().iterator().next();

		return Integer.parseInt(row.get(key).toString());
	}

	private String buildStart(String searchText) {
		String concatString = this.concat(this.split(searchText));

		return "START a=node:" + TextIndex.TEXT_INDEX_KEY_INDEX + "('key: (" + concatString + ")') ";
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
