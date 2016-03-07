package at.ac.tuwien.dst.mms.dal.repo;

import at.ac.tuwien.dst.mms.model.GeneralNodeJamaIndex;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

/**
 * Created by XLin on 07.03.2016.
 */
public interface GeneralNodeJamaIndexRepository extends GraphRepository<GeneralNodeJamaIndex> {
	@Query("START  a=node:" + GeneralNodeJamaIndex.KEY_INDEX +"(jamaId = {0}) RETURN a")
	public GeneralNodeJamaIndex findByJamaId(Long id);
}
