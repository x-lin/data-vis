package at.ac.tuwien.dst.mms.dal.repo;

import org.springframework.data.neo4j.repository.GraphRepository;
import org.springframework.data.repository.CrudRepository;

import at.ac.tuwien.dst.mms.dal.model.Requirement;

/**
 * Created by xlin on 08.01.2016.
 */
public interface RequirementRepository  extends GraphRepository<Requirement> {
}
