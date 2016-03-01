package at.ac.tuwien.dst.mms.jira.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * Contains the configuration for some customizable values.
 */
public class Config {
	static {
		String propertiesFile = "config.properties";

		Properties properties = new Properties();
		try (InputStream in = Config.class.getResourceAsStream("/"+propertiesFile)) {
			properties.load(in);
			JIRA_URI = properties.getProperty("jira");
			USERNAME = properties.getProperty("username");
			PASSWORD = properties.getProperty("password");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static String JIRA_URI;

	public static String USERNAME;

	public static String PASSWORD;
}
