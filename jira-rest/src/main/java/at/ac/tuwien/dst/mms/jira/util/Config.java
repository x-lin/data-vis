package at.ac.tuwien.dst.mms.jira.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * Contains the configuration for some customizable values.
 */
public class Config {

	public static String JIRA_URI;

	static {
		String propertiesFile = "config.properties";

		Properties properties = new Properties();
		try (InputStream in = Config.class.getResourceAsStream("/"+propertiesFile)) {
			properties.load(in);

			JIRA_URI = properties.getProperty("jira");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
