package at.ac.tuwien.dst.mms.dal.jira;

import at.ac.tuwien.dst.mms.dal.DataWriter;
import at.ac.tuwien.dst.mms.dal.jira.converters.JiraIssueDTOToGeneralNode;
import at.ac.tuwien.dst.mms.dal.jira.dto.JiraIssueDTO;
import at.ac.tuwien.dst.mms.dal.repo.GeneralNodeRepository;
import at.ac.tuwien.dst.mms.model.GeneralNode;
import org.neo4j.graphdb.Transaction;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.core.GraphDatabase;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by XLin on 25.04.2016.
 */
@Service
public class JiraIssueDTOWriter implements DataWriter<JiraIssueDTO> {
	@Autowired
	private GeneralNodeRepository generalNodeRepository;

	@Autowired
	private GraphDatabase graphDatabase;

	@Autowired
	private JiraIssueDTOToGeneralNode issueConverter;

	@Autowired(required = false)
	private Logger logger;

	@Override
	public void write(List<JiraIssueDTO> issues) {
		try (Transaction tx = graphDatabase.beginTx()) {
			for (JiraIssueDTO issue : issues) {
				GeneralNode findIssue = generalNodeRepository.findbyName(issue.getName(), issue.getProject().getKey());

				if (!issue.getStatus().equals("Closed")) {
					GeneralNode dbIssue = findIssue != null ?
							issueConverter.convert(issue, findIssue) : issueConverter.convert(issue);

					generalNodeRepository.save(dbIssue);
				} else {
					generalNodeRepository.delete(findIssue);
				}
			}

			tx.success();
		}

		logger.info(issues.size() + " issues saved for project " +
				(issues.size() > 0 ? issues.iterator().next().getProject().getKey() : "") + ".");
	}

	@Override
	public void write(JiraIssueDTO object) {
		logger.warn("Method not implemented yet.");
	}

	@Override
	public void delete(List<JiraIssueDTO> issues) {
		for(JiraIssueDTO issue : issues) {
			GeneralNode findIssue = generalNodeRepository.findbyName(issue.getName(), issue.getProject().getKey());

			if(findIssue != null) {
				generalNodeRepository.delete(findIssue);
			}
		}
	}
}
