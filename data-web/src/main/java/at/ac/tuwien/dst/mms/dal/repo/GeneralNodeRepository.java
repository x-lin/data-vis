package at.ac.tuwien.dst.mms.dal.repo;

import at.ac.tuwien.dst.mms.model.*;
import org.springframework.data.domain.Pageable;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

import java.util.List;
import java.util.Map;

/**
 * Created by xlin on 08.01.2016.
 */
public interface GeneralNodeRepository extends GraphRepository<GeneralNode>, GeneralNodeRepositoryCustom {
	@Query("START  a=node:" + GeneralNode.GENERAL_NODE_KEY_INDEX +"(key = {0}) RETURN a")
	public GeneralNode findByKey(String key);

	public List<GeneralNode> findByProject(Project project);

	//TODO fix some issues with duplicate entries
	@Query("MATCH (p:Project)--(a:GeneralNode)--(b:GeneralNodeType) WHERE a.name={0} AND (b.key='BUG' OR b.key='WP') AND p.key={1} RETURN a LIMIT 1")
	public GeneralNode findbyName(String name, String projectKey);

	@Query("MATCH (a:GeneralNode) RETURN a LIMIT {0}")
	public List<GeneralNode> findAll(int limit);

	public List<GeneralNode> findAllByKey(String key, Pageable pageable);

	public List<GeneralNode> findAllByKey(String key);

	@Query("START b=node:" + GeneralNode.GENERAL_NODE_KEY_INDEX + "(key = {0}) MATCH (a)-[]-(b) RETURN b")
	public Iterable<Map<String, Object>> findNeighbors(String key);

	@Query("START  a=node:" + GeneralNodeJamaIndex.KEY_INDEX +"(jamaId = {0}) MATCH (a)-[]-(b) RETURN b")
	public GeneralNode findByJamaId(Long id);

//	@Query("START  a=node:" + GeneralNodeJamaIndex.KEY_INDEX +"(key = {0}) RETURN a")
//	public GeneralNodeJamaIndex findByJamaId(Long id);
}
