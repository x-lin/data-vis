package at.ac.tuwien.dst.mms.dal.repo;

import at.ac.tuwien.dst.mms.model.Issue;
import at.ac.tuwien.dst.mms.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

import java.util.List;

/**
 * Created by xlin on 08.01.2016.
 */
public interface UserRepository extends GraphRepository<User> {
	@Query("START  a=node:" + User.USER_NAME_INDEX +"(name = {0}) RETURN a")
	public User findByName(String name);

	public List<User> findAllByName(String name, Pageable pageable);

	public List<User> findAllByName(String name);

	@Query("MATCH (a:User) RETURN a LIMIT {0}")
	public List<User> findAll(int limit);

	@Query("MATCH (a:Issue)-[]->(b:User {name: {0}}) RETURN a LIMIT {1}")
	public List<Issue> findByUserNameLimit(String name, Integer limit);
}
