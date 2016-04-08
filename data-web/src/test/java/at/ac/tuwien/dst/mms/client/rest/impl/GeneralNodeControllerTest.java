package at.ac.tuwien.dst.mms.client.rest.impl;

import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;

/**
 * Created by XLin on 09.03.2016.
 */
public class GeneralNodeControllerTest extends AbstractJUnit4SpringContextTests {
//	@Autowired
//	RestTemplate restTemplate;
//
//	MockRestServiceServer mockServer;
//
//	@Before
//	public void setUp() {
//		mockServer = MockRestServiceServer.createServer(restTemplate);
//	}
//
//	//testGetMessage() verifies our URL, GET HttpMethod, and returns a 200 Success with a text message of resultSuccess:
//
//	@Test
//	public void testGetMessage() {
//		Config.JAMA_EXTRACTOR_HOST
//		mockServer.expect(requestTo("http://google.com"))
//				.andExpect(method(HttpMethod.GET))
//				.andRespond(withSuccess("resultSuccess", MediaType.TEXT_PLAIN));
//
//		String result = simpleRestService.getMessage();
//
//		mockServer.verify();
//		assertThat(result, allOf(containsString("SUCCESS"), containsString("resultSuccess")));
//	}
//
//	//testGetMessage_404() shows a response with the specific 404 Not Found client http status code:
//
//	@Test
//	public void testGetMessage_404() {
//		mockServer.expect(requestTo("http://google.com"))
//				.andExpect(method(HttpMethod.GET))
//				.andRespond(withStatus(HttpStatus.NOT_FOUND));
//
//		String result = simpleRestService.getMessage();
//
//		mockServer.verify();
//		assertThat(result, allOf(containsString("FAILED"),
//				containsString("404")));
//	}
//
//	//testGetMessage_500() shows usage of the withServerError() convenience method:
//
//	@Test
//	public void testGetMessage_500() {
//		mockServer.expect(requestTo("http://google.com"))
//				.andExpect(method(HttpMethod.GET))
//				.andRespond(withServerError());
//
//		String result = simpleRestService.getMessage();
//
//		mockServer.verify();
//		assertThat(result, allOf(containsString("FAILED"),
//				containsString("500")));
//	}
}
