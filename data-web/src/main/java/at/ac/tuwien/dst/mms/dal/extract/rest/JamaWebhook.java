package at.ac.tuwien.dst.mms.dal.extract.rest;

import at.ac.tuwien.dst.mms.dal.DataWriter;
import at.ac.tuwien.dst.mms.dal.extract.rest.model.JamaRelationship;
import at.ac.tuwien.dst.mms.model.GeneralNode;
import at.ac.tuwien.dst.mms.model.Project;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.List;

/**
 * Created by XLin on 04.03.2016.
 */
@RestController
@RequestMapping("/jama/webhook")
public class JamaWebhook {
	@Autowired
	DataWriter neoWriter;

	@Autowired(required=false)
	Logger logger;

	@RequestMapping(path="/projects", method= RequestMethod.POST)
	public void projects(
			@RequestBody Project[] projects) {
		neoWriter.storeProjects(projects);
	}

	@RequestMapping(path="/items", method=RequestMethod.POST)
	public void issues(
			@RequestBody List<GeneralNode> items) {

		try (Writer output = new BufferedWriter(new FileWriter("target/errors1.log"))) {
			try {
				logger.info(items.size() + " items received, storing now.");

				neoWriter.storeGeneralNodes(items);
			} catch (Exception e) {
				logger.error("Exception occurred: ", e);
				output.append(e.getMessage());
			}
		} catch(IOException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(path="/relationships", method=RequestMethod.POST)
	public void relationships(
			@RequestBody List<JamaRelationship> relationships) {

		try (Writer output = new BufferedWriter(new FileWriter("target/errors1.log"))) {
			try {
				logger.info(relationships.size() + " relationships received, storing now.");

				neoWriter.addRelationships(relationships);
			} catch (Exception e) {
				logger.error("Exception occurred: ", e);
				output.append(e.getMessage());
			}
		} catch(IOException e) {
			e.printStackTrace();
		}
	}
}
