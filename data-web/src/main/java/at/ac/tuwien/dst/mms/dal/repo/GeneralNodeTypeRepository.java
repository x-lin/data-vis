package at.ac.tuwien.dst.mms.dal.repo;

import at.ac.tuwien.dst.mms.model.GeneralNode;
import at.ac.tuwien.dst.mms.model.GeneralNodeType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

import java.util.List;
import java.util.Map;

/**
 * Created by XLin on 04.03.2016.
 */
public interface GeneralNodeTypeRepository extends GraphRepository<GeneralNodeType> {
	@Query("START  a=node:" + GeneralNodeType.GENERAL_NODE_TYPE_KEY_INDEX +"(key = {0}) RETURN a")
	GeneralNodeType findByKey(String key);

	@Query("MATCH (a:GeneralNodeType) RETURN a")
	List<GeneralNodeType> findAll(int limit);

	List<GeneralNode> findAllByKey(String key, Pageable pageable);

	List<GeneralNode> findAllByKey(String key);

	@Query("START b=node:" + GeneralNodeType.GENERAL_NODE_TYPE_KEY_INDEX + "(key = {0}) MATCH (a)-[]-(b) RETURN b")
	Iterable<Map<String, Object>> findNeighbors(String key);
}
