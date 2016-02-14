package at.ac.tuwien.dst.mms.client.rest;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Created by xlin on 16.01.2016.
 */
@RestController
public interface SearchController<T> {
	@RequestMapping(value = "/all", method= RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	Iterable<T> getAll(
			@RequestParam Integer limit
	);

	@RequestMapping(value = "/{key}", method= RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	T getOne(
			@PathVariable String key);

	@RequestMapping(value = "/like/{string}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	List<T> getAllMatching(
			@PathVariable String string,
			@RequestParam Integer limit);

	@RequestMapping(value = "/startLike/{string}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	List<T> getAllStartingWith(
			@PathVariable String string,
			@RequestParam Integer limit);

	@RequestMapping(value ="/count", method = RequestMethod.GET)
	Long countAll();


	@RequestMapping(value = "/neighbors/{key}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	Map<String, List<Object>> getNeighbors(
			@PathVariable String key,
			@RequestParam Integer limit);

	@RequestMapping(value = "/indirect", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	List<T> getByNeighborKey(
			@RequestParam String key,
			@RequestParam String value,
			@RequestParam Integer limit);

}
