package at.ac.tuwien.dst.mms.rest;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by xlin on 04.01.2016.
 */
@RestController
@RequestMapping("/data-vis")
public class VisController {

	//@RequestMapping( method=RequestMethod.GET)
	@RequestMapping( method= RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public TestJson query(
			@RequestParam String name
	) {
		System.out.println("processing request");
		return new TestJson(name);
	}
}
