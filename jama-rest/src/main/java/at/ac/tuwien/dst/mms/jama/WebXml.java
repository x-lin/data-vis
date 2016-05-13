package at.ac.tuwien.dst.mms.jama;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.annotation.Configuration;

/**
 * Specifies the web.xml information. The web.xml file is not needed anymore by the existence of this class.
 */
@Configuration
public class WebXml extends SpringBootServletInitializer {
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(Application.class);
	}
}
