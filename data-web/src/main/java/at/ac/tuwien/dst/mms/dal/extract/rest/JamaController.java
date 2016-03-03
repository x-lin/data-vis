package at.ac.tuwien.dst.mms.dal.extract.rest;

import at.ac.tuwien.dst.mms.dal.jobs.JamaExtractor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/jama/extract")
public class JamaController {
	@Autowired
	JamaExtractor extractor;

	/**
	 * Start extractor to fetch complete dataset and store it in Neo4j DB.
	 */
	@RequestMapping(path="/all", method= RequestMethod.GET)
	public void getAll() {
		extractor.extractAll();
	}

//	/**
//	 * Testing purposes
//	 */
//	@RequestMapping(path="/test", method= RequestMethod.GET)
//	public void testing() {
//		extractor.testing();
//	}

}
