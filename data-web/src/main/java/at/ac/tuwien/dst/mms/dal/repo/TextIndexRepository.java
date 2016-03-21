package at.ac.tuwien.dst.mms.dal.repo;

import at.ac.tuwien.dst.mms.model.TextIndex;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

/**
 * Created by XLin on 21.03.2016.
 */
public interface TextIndexRepository extends GraphRepository<TextIndex>, TextIndexRepositoryCustom {
	@Query("START  a=node:" + TextIndex.TEXT_INDEX_KEY_INDEX +"(key = {0}) RETURN a")
	public TextIndex findByKey(String key);

//	@Query("START a=node:" + TextIndex.TEXT_INDEX_KEY_INDEX + "('key: ({0})') " +
//			"MATCH (a)-[]-(b:GeneralNode)-[:NODE_TYPE]-(c) " +
//			"RETURN b.key AS key, b.name AS name, c.key AS typeKey, c.name AS type " +
//			"LIMIT {1} " +
//			"UNION " +
//			"START a=node:" + TextIndex.TEXT_INDEX_KEY_INDEX + "('key: ({0})') " +
//			"MATCH (a)-[]-(b:Project) " +
//			"RETURN b.key AS key, b.name AS name, 'PROJECT' AS typeKey, 'Project' AS type " +
//			"LIMIT {1}")
//	public List<TextSearch> findBySearchText(String searchText, int limit);
}