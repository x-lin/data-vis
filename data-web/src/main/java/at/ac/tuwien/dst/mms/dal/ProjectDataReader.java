package at.ac.tuwien.dst.mms.dal;

import at.ac.tuwien.dst.mms.dal.query.model.ProjectSchema;

/**
 * Created by XLin on 23.03.2016.
 */
public interface ProjectDataReader {
	ProjectSchema getSchema(String key);

	ProjectSchema getSchema(String key, String relation);
}
