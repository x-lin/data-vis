package at.ac.tuwien.dst.mms.dal.jama;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

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
			@RequestParam(value="limit", required=false) Integer limit,
			@RequestParam(value="projectId") Integer projectId
	) {
		extractor.extractNodes(projectId);
	}

	@RequestMapping(path="/relationships", method= RequestMethod.GET)
	public void getRelationships(
			@RequestParam(value="limit", required=false) Integer limit,
			@RequestParam(value="key", required=false) String[] keys
	) {
		if(limit != null && limit != -1 && limit != 0) {
			extractor.extractRelationships(limit);
		} else {
			extractor.extractRelationships();
			//extractor.extractNodes();
		}
	}

	@RequestMapping(path="/activities", method=RequestMethod.GET)
	public void update(
			@RequestParam(value="dateFrom", required=false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date dateFrom,
			@RequestParam(value="dateTo", required=false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date dateTo
	) {
		extractor.extractActivities(dateFrom, dateTo);
	}

	@RequestMapping(path="/children", method=RequestMethod.GET)
	public void addParentChildren() {
		extractor.addParentChildren();
	}
}
