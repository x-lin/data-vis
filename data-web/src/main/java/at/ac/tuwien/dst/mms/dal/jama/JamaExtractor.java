package at.ac.tuwien.dst.mms.dal.jama;

import at.ac.tuwien.dst.mms.dal.DataWriter;
import at.ac.tuwien.dst.mms.dal.jama.dto.JamaActivityDTO;
import at.ac.tuwien.dst.mms.dal.jama.dto.JamaNodeDTO;
import at.ac.tuwien.dst.mms.dal.jama.dto.JamaProjectDTO;
import at.ac.tuwien.dst.mms.dal.repo.GeneralNodeJamaIndexRepository;
import at.ac.tuwien.dst.mms.dal.repo.GeneralNodeRepository;
import at.ac.tuwien.dst.mms.dal.repo.ProjectRepository;
import at.ac.tuwien.dst.mms.model.GeneralNode;
import at.ac.tuwien.dst.mms.model.GeneralNodeJamaIndex;
import at.ac.tuwien.dst.mms.model.Project;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Set;


@Service
public class JamaExtractor {
	@Autowired
	JamaRestClient jamaRestClient;

	@Autowired
	DataWriter<JamaProjectDTO> projectWriter;

	@Autowired(required = false)
	Logger logger;

	@Autowired
	JamaActivitiesDTOWriter activitiesDTOWriter;

	//TODO remove persistent error logging
	@Async
	public void extractNodes() {
		try (Writer output = new BufferedWriter(new FileWriter("target/errors.log"))) {

			long start = System.nanoTime();

			List<JamaProjectDTO> projects = Arrays.asList(jamaRestClient.getProjects());

			for (JamaProjectDTO project : projects) {
				try {
					if (project.getJamaId() == 27) {
						projectWriter.write(projects);
						this.extractItems(project.getJamaId());
					}
				} catch (Exception e) {
					logger.error("Exception occurred: ", e);
					output.write(e.getMessage());
				}
			}

			logger.info("Finished requesting all data in " + (System.nanoTime() - start)/1000000000.0 + "s.");
		} catch(IOException e) {
			e.printStackTrace();
		}
	}


	@Async
	public void extractRelationships(int limit) {
		List<JamaProjectDTO> projects = Arrays.asList(jamaRestClient.getProjects()).subList(0, limit);

		for (JamaProjectDTO project : projects) {
			try {
				jamaRestClient.getRelationships(project.getJamaId());
			} catch (Exception e) {
				logger.error("Exception occurred: ", e);
			}
		}
	}

	@Autowired
	private GeneralNodeJamaIndexRepository jamaIndexRepository;

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private GeneralNodeRepository generalNodeRepository;

	public void addParentChildren() {
		List<Project> projects = projectRepository.findAll(100000);

		for (Project project : projects) {
			this.addParentChildren(project);
		}
	}

	@Transactional
	private void addParentChildren(Project project) {
		List<GeneralNode> nodes = generalNodeRepository.findAllByProject(project);

		for (GeneralNode node : nodes) {
			if (node.getJamaParentId() != null) {
				GeneralNodeJamaIndex parentIndex = jamaIndexRepository.findByJamaId(node.getJamaParentId());
				GeneralNode parent = parentIndex != null ? parentIndex.getNode() : null;

				if (parent != null) {
					Set<GeneralNode> downstream = generalNodeRepository.findAllDownstream(parent.getKey());
					downstream.add(node);
					parent.setDownstream(downstream);

					generalNodeRepository.save(parent);
				}
			}

		}

		logger.info(nodes.size() + " nodes for project " + project.getKey() + " updated with parent/children.");
	}

	@Async
	public void extractRelationships() {
		jamaRestClient.getRelationships(0);
	}

	@Async
	public List<JamaNodeDTO> extractItems(Integer projectId) {
		JamaNodeDTO[] nodes = jamaRestClient.getItems(projectId);

		if(nodes != null) {
			return Arrays.asList(nodes);
		} else {
			return null;
		}
	}

	public void extractActivities(Date dateFrom, Date dateTo) {
		JamaActivityDTO[] nodes = jamaRestClient.getUpdates(dateFrom, dateTo);
		activitiesDTOWriter.handle(Arrays.asList(nodes));
	}
}
