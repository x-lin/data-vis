package at.ac.tuwien.dst.mms.dal.jira;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by xlin on 08.01.2016.
 */
@RestController
@RequestMapping("/jira/extract")
public class JiraController {
	@Autowired
	JiraExtractor extractor;

	/**
	 * Start extractor to fetch complete dataset and store it in Neo4j DB.
	 */
	@RequestMapping(path="/all", method= RequestMethod.GET)
	public void getAll(
			@RequestParam(value="updated", required=false) String updated
	) {
		extractor.extractAll(updated);
	}

	@RequestMapping(path="/tickets", method= RequestMethod.GET)
	public void getTickets(
			@RequestParam(value="updated", required=false) String updated
	) {
		//extractor.extractTickets("PVCSB");
		extractor.extractTickets("PVCSC", updated);
		//extractor.extractTickets("PDIV");
	}
}
