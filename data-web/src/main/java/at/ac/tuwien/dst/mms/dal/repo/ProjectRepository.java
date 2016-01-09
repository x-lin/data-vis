package at.ac.tuwien.dst.mms.dal.repo;

import org.springframework.data.repository.CrudRepository;

import at.ac.tuwien.dst.mms.dal.model.Project;
import java.util.List;

/**
 * Created by xlin on 08.01.2016.
 */
public interface ProjectRepository extends CrudRepository<Project, String> {
	public Project findByKey(String key);

	public Project findByName(String name);

	public List<Project> findAll();

//	@Query("{" +
//			"day:{$gte:?0, $lte:?1}," +
//			"type.description:{$regex:?2}," +
//			"hospital.location:{$near:[?3, ?4]}" +
//			"}")
//	public list<project> findbystring(string string);
}
