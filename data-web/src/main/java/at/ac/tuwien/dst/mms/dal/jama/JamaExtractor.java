package at.ac.tuwien.dst.mms.dal.jama;

import at.ac.tuwien.dst.mms.dal.DataWriter;
import at.ac.tuwien.dst.mms.dal.jama.dto.JamaNodeDTO;
import at.ac.tuwien.dst.mms.dal.jama.dto.JamaProjectDTO;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.Arrays;
import java.util.List;


@Service
public class JamaExtractor {
	@Autowired
	JamaRestClient jamaRestClient;

	@Autowired
	DataWriter<JamaProjectDTO> projectWriter;

	@Autowired(required = false)
	Logger logger;

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

	@Async
	public void extractRelationships() {
		jamaRestClient.getRelationships(0);
	}

	@Async
	public List<JamaNodeDTO> extractItems(Integer projectId) {
		JamaNodeDTO[] nodes = jamaRestClient.getItems(projectId);

		if(nodes != null) {
			return Arrays.asList(jamaRestClient.getItems(projectId));
		} else {
			return null;
		}
	}
}
