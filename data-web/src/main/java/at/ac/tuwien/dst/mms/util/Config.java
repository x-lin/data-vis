package at.ac.tuwien.dst.mms.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * Created by xlin on 07.01.2016.
 *
 * //TODO inject values from rest controllers with config values.
 */
public class Config {

	/**
	 * Init with properties file.
	 */
	static {
		String propertiesFile = "config.properties";
		try (InputStream in = Config.class.getResourceAsStream("/"+propertiesFile)) {

			Properties properties = new Properties();

			properties.load(in);

			HOST = properties.getProperty("host");
			JIRA_WRAPPER_HOST = properties.getProperty("jiraWrapper");
			JAMA_EXTRACTOR_HOST = properties.getProperty("jamaExtractor");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static final int REPO_LIMIT = 100;
	public static final String REPO_LIMIT_STRING = "100";

	public static final int SEARCH_LIMIT = 11;
	public static final String SEARCH_LIMIT_STRING = "11";

	public static String HOST;

	public static String JIRA_WRAPPER_HOST;

	public static String JAMA_EXTRACTOR_HOST;

	public final static String JIRA_WEBHOOK_REL = "/jira/webhook";

	public final static String JAMA_WEBHOOK_REL = "/jama/webhook";

	public final static String JIRA_WEBHOOK_URI = HOST + JIRA_WEBHOOK_REL;

	public final static String JAMA_WEBHOOK_URI = HOST + JAMA_WEBHOOK_REL;

	public final static String PROJECTS_PATH = "/projects";

	public final static String ISSUES_PATH = "/issues";

	public final static String USERS_PATH = "/users";

	public final static String ITEMS_PATH = "/items";

	public final static String REQUIREMENTS_PATH = "/reqs";

	private static final String RELATIONSHIPS_PATH = "/relationships";

	public final static String GENERAL_NODES_PATH = "/generalNodes";

	public final static String JIRA_WEBHOOK_PROJECTS = JIRA_WEBHOOK_URI + PROJECTS_PATH;

	public final static String JIRA_WEBHOOK_ISSUES = JIRA_WEBHOOK_URI + ISSUES_PATH;

	public final static String JAMA_WEBHOOK_PROJECTS = JAMA_WEBHOOK_URI + PROJECTS_PATH;

	public final static String JAMA_WEBHOOK_ITEMS = JAMA_WEBHOOK_URI + ITEMS_PATH;

	public final static String JAMA_WEBHOOK_RELATIONSHIPS = JAMA_WEBHOOK_URI + RELATIONSHIPS_PATH;

	public final static String SEARCH_REST_PATH = "/search";
}
