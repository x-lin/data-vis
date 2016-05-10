package at.ac.tuwien.dst.mms.jobs;

import at.ac.tuwien.dst.mms.dal.jama.JamaController;
import at.ac.tuwien.dst.mms.dal.jira.JiraController;
import org.quartz.SchedulerException;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * Created by XLin on 10.05.2016.
 */
@Service
public class ExtractionJob {
	private final int INITIAL_DELAY_MS = 10000;

	//extracting every 10 minutes
	private final int RATE_MS = 1000 * 60 * 10;

	@Autowired
	private JamaController jamaController;

	@Autowired
	private JiraController jiraController;

	@Autowired(required = false)
	private Logger logger;

	private java.util.Calendar lastExtracted = null;

	public ExtractionJob() {
		lastExtracted = java.util.Calendar.getInstance();
	}

	@Scheduled(initialDelay = INITIAL_DELAY_MS, fixedRate = RATE_MS)
	private void scheduleJob() throws SchedulerException {
		logger.info("Extracting data on " + lastExtracted.getTime());

		//TODO persistently save lastExtracted time (or save to DB)

		Date extractionDate = lastExtracted.getTime();
		lastExtracted.setTime(java.util.Calendar.getInstance().getTime());
		jamaController.update(extractionDate, null);

		//TODO convert date to hour value
		//jiraController.getTickets(extractionDate.toString());
	}
}
