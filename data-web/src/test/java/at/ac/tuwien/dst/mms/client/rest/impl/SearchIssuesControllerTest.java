package at.ac.tuwien.dst.mms.client.rest.impl;

import at.ac.tuwien.dst.mms.AbstractWebIntegrationTest;
import at.ac.tuwien.dst.mms.dal.repo.IssueRepository;
import org.junit.Test;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by xlin on 13.02.2016.
 */
public class SearchIssuesControllerTest extends AbstractWebIntegrationTest {
	@Autowired
	private IssueRepository repo;

	@Autowired(required=false)
	Logger logger;

	@Test
	public void testGetOne() {
		logger.info("testing");
		logger.info(repo.toString());
		logger.info(repo.findAll(30).size()+"");
	}
}
