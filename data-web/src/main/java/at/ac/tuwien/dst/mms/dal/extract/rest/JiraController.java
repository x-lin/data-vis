package at.ac.tuwien.dst.mms.dal.extract.rest;

import at.ac.tuwien.dst.mms.dal.jobs.JiraExtractor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by xlin on 08.01.2016.
 */
@RestController
@RequestMapping("/extract")
public class JiraController {
	@Autowired
	JiraExtractor extractor;

	/**
	 * Start extractor to fetch complete dataset and store it in Neo4j DB.
	 */
	@RequestMapping(path="/all", method= RequestMethod.GET)
	public void getAll() {
		extractor.extractAll();
	}
}
