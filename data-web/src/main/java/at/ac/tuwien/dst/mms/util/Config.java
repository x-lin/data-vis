package at.ac.tuwien.dst.mms.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Properties;

/**
 * Created by xlin on 07.01.2016.
 *
 * //TODO inject values from rest controllers with config values.
 */
public class Config {
	public static int REPO_LIMIT = 100;

	/**
	 * Init with properties file.
	 */
	static {
		String propertiesFile = "config.properties";

		Properties properties = new Properties();
		try (InputStream in = Config.class.getResourceAsStream("/"+propertiesFile)) {
			properties.load(in);

			HOST = properties.getProperty("host");
			JIRA_WRAPPER_HOST = properties.getProperty("jiraWrapper");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static String HOST;

	public static String JIRA_WEBHOOK_REL = "/jira/webhook";

	public static String JIRA_WEBHOOK_URI = HOST + JIRA_WEBHOOK_REL;

	public static String PROJECTS_PATH = "/projects";

	public static String ISSUES_PATH = "/issues";

	public static String JIRA_WEBHOOK_PROJECTS = JIRA_WEBHOOK_URI + PROJECTS_PATH;

	public static String JIRA_WEBHOOK_ISSUES = JIRA_WEBHOOK_URI + ISSUES_PATH;

	public static String JIRA_WRAPPER_HOST;
}
