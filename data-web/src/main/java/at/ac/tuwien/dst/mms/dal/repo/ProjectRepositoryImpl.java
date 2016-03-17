package at.ac.tuwien.dst.mms.dal.repo;

import at.ac.tuwien.dst.mms.model.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Created by XLin on 17.03.2016.
 */
@Repository
public class ProjectRepositoryImpl implements ProjectRepositoryCustom {
	@Autowired
	Neo4jTemplate template;

	@Autowired
	NeighborQueryBuilder queryBuilder;

	@Override
	public Iterable<Map<String, Object>> findNeighbors(String key, boolean upstream, boolean downstream,
													   List<String> excluded, List<String> priority, Integer limit) {

//		"START p=node:projectKeyIndex(key={0}) MATCH (p)-[]-(n:GeneralNode)-[]-(m:GeneralNodeType) RETURN n LIMIT 20") //direction
//			"WHERE m.key<>'FEAT'" + //{2}
//			"WITH m,n,p, " +
//			"CASE m.key" +
//			"  WHEN 'FEAT' THEN 0" +
//			"  WHEN 'SSS' THEN 1" +
//			"  WHEN 'SRS' THEN 2" +
//			"  ELSE 3" +
//			"END as sortOrder" +
//			"RETURN n ORDER BY sortOrder" +
//			"LIMIT {4}")

		String query = queryBuilder.buildQuery(Project.PROJECT_KEY_INDEX, key, upstream, downstream, excluded, priority, limit);

		return template.query(query, null);
	}
}
