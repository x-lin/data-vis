package at.ac.tuwien.dst.mms.dal.extract.mock;

import at.ac.tuwien.dst.mms.dal.DataReader;
import at.ac.tuwien.dst.mms.dal.repo.IssueRepository;
import at.ac.tuwien.dst.mms.dal.repo.ProjectRepository;
import at.ac.tuwien.dst.mms.model.Issue;
import at.ac.tuwien.dst.mms.model.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by xlin on 14.01.2016.
 */
@RestController
@RequestMapping("/mock")
public class MockController {
	@Autowired
	RequirementRandomGenerator generator;

	@Autowired
	DataReader reader;

	/**
	 * Generate a bunch of random requirements for all issues and store them.
	 */
	@RequestMapping(path="/gen", method= RequestMethod.GET)
	public void generateAndStore() {
		for (Project project : reader.getAllProjects()) {
			generator.generate(project);
		}
	}


}
