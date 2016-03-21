package at.ac.tuwien.dst.mms.dal.jama;

import at.ac.tuwien.dst.mms.model.GeneralNode;
import at.ac.tuwien.dst.mms.model.Project;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Arrays;


@Service
public class JamaExtractor {
	@Autowired
	JamaRestClient jamaRestClient;

	@Autowired
	JamaDataWriter dataWriter;

	@Autowired(required = false)
	Logger logger;

	//TODO remove persistent error logging
	@Async
	public void extractNodes() {
		try (Writer output = new BufferedWriter(new FileWriter("target/errors.log"))) {

			long start = System.nanoTime();

			Project[] projects = jamaRestClient.getProjects();

			dataWriter.storeProjects(projects);

			for (Project project : projects) {
				try {
					this.extractItems(project.getJamaId());
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
	public void extractNodes(int limit) {
		try (Writer output = new BufferedWriter(new FileWriter("target/errors.log"))) {

			long start = System.nanoTime();

			Project[] projects = Arrays.copyOfRange(jamaRestClient.getProjects(), 0, limit);

			dataWriter.storeProjects(projects);

			for (Project project : projects) {
				try {
					this.extractItems(project.getJamaId());
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
	public void extractNodes(String[] keys) {
		try (Writer output = new BufferedWriter(new FileWriter("target/errors.log"))) {

			long start = System.nanoTime();

			Project[] unfilteredProjects = jamaRestClient.getProjects();
			ArrayList<Project> projects = new ArrayList<>();

			for(Project project : unfilteredProjects) {
				boolean isIn = false;
				for(String key: keys) {
					if(project.getKey().equals(key)) {
						isIn = true;
						break;
					}
				}

				if(isIn) {
					projects.add(project);
				}
			}

			dataWriter.storeProjects(projects);
			this.extractItems(0);

//			for (Project project : projects) {
//				try {
//
//				} catch (Exception e) {
//					logger.error("Exception occurred: ", e);
//					output.write(e.getMessage());
//				}
//			}

			logger.info("Finished requesting all data in " + (System.nanoTime() - start)/1000000000.0 + "s.");
		} catch(IOException e) {
			e.printStackTrace();
		}
	}

	@Async
	public void extractRelationships(int limit) {
		Project[] projects = Arrays.copyOfRange(jamaRestClient.getProjects(), 0, limit);

		System.out.println(projects.length + " projects");

		for (Project project : projects) {
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
	public void extractRelationships(String[] keys) {
		try (Writer output = new BufferedWriter(new FileWriter("target/errors.log"))) {

			long start = System.nanoTime();

			Project[] unfilteredProjects = jamaRestClient.getProjects();
			ArrayList<Project> projects = new ArrayList<>();

			for(Project project : unfilteredProjects) {
				boolean isIn = false;
				for(String key: keys) {
					if(project.getKey().equals(key)) {
						isIn = true;
						break;
					}
				}

				if(isIn) {
					projects.add(project);
				}
			}

			dataWriter.storeProjects(projects);

			for (Project project : projects) {
				try {
					jamaRestClient.getRelationships(project.getJamaId());
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
	public GeneralNode[] extractItems(Integer projectId) {
		return jamaRestClient.getItems(projectId);
	}
}
