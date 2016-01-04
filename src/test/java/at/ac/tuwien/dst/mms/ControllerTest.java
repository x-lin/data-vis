package at.ac.tuwien.dst.mms;

import org.junit.runner.RunWith;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest({"server.port:0",
        "spring.datasource.url:jdbc:h2:mem:data-vis;DB_CLOSE_ON_EXIT=FALSE"})
public class ControllerTest {
//    @Value("${local.server.port}")
//    int port;
//
//    @Before
//    public void setUp() throws Exception {
//        RestAssured.port = port;
//    }
//
//    @Test
//    public void testHello() throws Exception {
//        when().get("/").then()
//                .body(is("Hello World!"));
//    }
//
//    @Test
//    public void testCalc() throws Exception {
//        given().param("left", 100)
//                .param("right", 200)
//                .get("/calc")
//                .then()
//                .body("left", is(100))
//                .body("right", is(200))
//                .body("answer", is(300));
//    }
}