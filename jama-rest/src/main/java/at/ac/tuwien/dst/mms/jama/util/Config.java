package at.ac.tuwien.dst.mms.jama.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * Created by XLin on 02.03.2016.
 */
public class Config {
    /**
     * Jamas internal maximum results.
     */
    public static final short MAX_RESULTS = 50;

    public static final String JIRA_IDENTIFIERT_NAME = "SYS_JIRA_KEY";

    static {
        String propertiesFile = "config.properties";

        Properties properties = new Properties();
        try (InputStream in = Config.class.getResourceAsStream("/"+propertiesFile)) {
            properties.load(in);
            HOST = properties.getProperty("host");
            USERNAME = properties.getProperty("username");
            PASSWORD = properties.getProperty("password");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static String HOST;

    public static String USERNAME;

    public static String PASSWORD;
}
