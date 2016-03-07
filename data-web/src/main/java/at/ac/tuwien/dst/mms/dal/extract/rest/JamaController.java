package at.ac.tuwien.dst.mms.dal.extract.rest;

import at.ac.tuwien.dst.mms.dal.jobs.JamaExtractor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/jama/extract")
public class JamaController {
	@Autowired
	JamaExtractor extractor;

	/**
	 * Start extractor to fetch complete dataset and store it in Neo4j DB.
	 */
	@RequestMapping(path="/nodes", method= RequestMethod.GET)
	public void getNodes(
			@RequestParam(value="limit", required=false) Integer limit
	) {
		if(limit != null && limit != -1 && limit != 0) {
			extractor.extractNodes(limit);
		} else {
			extractor.extractNodes();
		}
	}

	@RequestMapping(path="/relationships", method= RequestMethod.GET)
	public void getRelationships(
			@RequestParam(value="limit", required=false) Integer limit
	) {
		if(limit != null && limit != -1 && limit != 0) {
			extractor.extractRelationships(limit);
		} else {
			//extractor.extractNodes();
		}
	}
}
