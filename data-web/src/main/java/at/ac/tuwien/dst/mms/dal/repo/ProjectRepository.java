package at.ac.tuwien.dst.mms.dal.repo;

import at.ac.tuwien.dst.mms.model.Issue;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

import at.ac.tuwien.dst.mms.model.Project;

import java.util.List;

/**
 * Created by xlin on 08.01.2016.
 */
public interface ProjectRepository extends GraphRepository<Project> {
	public Project findByKey(String key);

	public Project findByName(String name);

	@Query("MATCH (n:Project) WHERE n.key =~ {0} RETURN n LIMIT {1}")
	//@Query("START n=node:label({0}) return n")
	//@Query("START node_auto_index(\"key:MNG-1*\") MATCH (n:Issue) RETURN n")
	public List<Project> findByLikeKey(String key, Integer limit);

//	@Query("{" +
//			"day:{$gte:?0, $lte:?1}," +
//			"type.description:{$regex:?2}," +
//			"hospital.location:{$near:[?3, ?4]}" +
//			"}")
//	public list<project> findbystring(string string);
}
