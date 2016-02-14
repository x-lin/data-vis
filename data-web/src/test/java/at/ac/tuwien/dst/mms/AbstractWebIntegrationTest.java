package at.ac.tuwien.dst.mms;

import at.ac.tuwien.dst.mms.test.TestApplication;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Created by xlin on 13.02.2016.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = TestApplication.class)
@WebIntegrationTest(randomPort = true)
public class AbstractWebIntegrationTest {
	@Value("${local.server.port}")
	private int port;


}
