package at.ac.tuwien.dst.mms.dal.jama;

import at.ac.tuwien.dst.mms.dal.DataWriter;
import at.ac.tuwien.dst.mms.dal.jama.converters.JamaProjectDTOToProject;
import at.ac.tuwien.dst.mms.dal.jama.dto.JamaProjectDTO;
import at.ac.tuwien.dst.mms.dal.repo.ProjectRepository;
import at.ac.tuwien.dst.mms.model.Project;
import org.neo4j.graphdb.Transaction;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.core.GraphDatabase;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by XLin on 25.04.2016.
 */
@Service
public class JamaProjectDTOWriter implements DataWriter<JamaProjectDTO> {
	@Autowired(required = false)
	private Logger logger;

	@Autowired
	private JamaProjectDTOToProject projectConverter;

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private GraphDatabase graphDatabase;

	@Override
	public void write(List<JamaProjectDTO> projects) {
		try(Transaction tx = graphDatabase.beginTx()) {
			for(JamaProjectDTO jamaProject : projects) {
				Project fromDb = projectRepository.findByKey(jamaProject.getKey());
				Project project = fromDb != null ?
						projectConverter.convert(jamaProject, fromDb) : projectConverter.convert(jamaProject);

				projectRepository.save(project);
			}

			tx.success();
		}

		logger.info(projects.size() + " projects saved.");
	}

	@Override
	public void write(JamaProjectDTO object) {
		logger.warn("Method not yet implemented");
	}

	@Override
	public void delete(List<JamaProjectDTO> objects) {
		logger.warn("Not allowed to delete projects.");
	}

	@Override
	public void delete(JamaProjectDTO object) {

	}
}
