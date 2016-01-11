package at.ac.tuwien.dst.mms.client.rest;

//import org.springframework.http.MediaType;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;

import at.ac.tuwien.dst.mms.dal.model.Issue;
import at.ac.tuwien.dst.mms.dal.repo.IssueRepository;
import at.ac.tuwien.dst.mms.dal.repo.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by xlin on 04.01.2016.
 */
@RestController
@RequestMapping("/data")
public class BasicDataController {
	@Autowired
	IssueRepository issueRepository;

	@Autowired
	ProjectRepository projectRepository;

	@RequestMapping(value = "/issues/{projectKey}", method= RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Issue> getIssuesForProject(
			@PathVariable  String projectKey
	) {
		return null;
		//return issueRepository.findByKey(projectKey);
	}

	@RequestMapping(value = "/issue/{projectKey}", method= RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Issue getIssue(
			@PathVariable String key
	) {
		return null;
	}

	//@RequestMapping( method=RequestMethod.GET)
	@RequestMapping( method= RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public TestJson query(
			@RequestParam String name
	) {
		System.out.println("processing request");
		return new TestJson(name);
	}
}
