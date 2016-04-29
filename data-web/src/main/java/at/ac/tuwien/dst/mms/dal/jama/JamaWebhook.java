package at.ac.tuwien.dst.mms.dal.jama;

import at.ac.tuwien.dst.mms.dal.DataWriter;
import at.ac.tuwien.dst.mms.dal.jama.dto.*;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

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
	DataWriter<JamaNodeDTO> nodeDTOWriter;

	@Autowired
	DataWriter<JamaProjectDTO> projectDTOWriter;

	@Autowired
	DataWriter<JamaRelationshipDTO> relationshipDTOWriter;

	@Autowired
	JamaActivitiesDTOWriter activityDTOWriter;

	@Autowired(required=false)
	Logger logger;

	@Autowired
	RestTemplate restTemplate;

	@RequestMapping(path="/projects", method= RequestMethod.POST)
	public void projects(
			@RequestBody List<JamaProjectDTO> projects) {
		projectDTOWriter.write(projects);
	}

	@RequestMapping(path="/items", method=RequestMethod.POST)
	public void issues(
			@RequestBody List<JamaNodeDTO> items) {

		try (Writer output = new BufferedWriter(new FileWriter("target/errors1.log"))) {
			try {
				logger.info(items.size() + " items received, storing now.");

				nodeDTOWriter.write(items);
			} catch (Exception e) {
				logger.error("Exception occurred: ", e);
				output.append(e.getMessage());
			}
		} catch(IOException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(path="/activities", method=RequestMethod.POST)
	public void activities(
			@RequestBody List<JamaActivityDTO> activities
	) {
		logger.info(activities.size() + " activities received, handling now.");
		activityDTOWriter.handle(activities);
	}

	@RequestMapping(path="/relationships", method=RequestMethod.POST)
	public void relationships(
			@RequestBody List<JamaRelationshipDTO> relationships) {

		try (Writer output = new BufferedWriter(new FileWriter("target/errors1.log"))) {
			try {
				logger.info(relationships.size() + " relationships received, storing now.");

				relationshipDTOWriter.write(relationships);

				logger.info(relationships.size() + " relationships processed.");
			} catch (Exception e) {
				logger.error("Exception occurred: ", e);
				output.append(e.getMessage());
			}
		} catch(IOException e) {
			e.printStackTrace();
		}
	}
}
