package at.ac.tuwien.dst.mms.dal.repo;

import org.springframework.data.repository.CrudRepository;

import at.ac.tuwien.dst.mms.dal.model.Issue;
import java.util.List;

/**
 * Created by xlin on 08.01.2016.
 */
public interface IssueRepository extends CrudRepository<Issue, String> {
	public Issue findByKey(String key);

	public List<Issue> findAll();
}
