package at.ac.tuwien.dst.mms.client.rest;

import at.ac.tuwien.dst.mms.dal.query.model.BugCoverage;
import at.ac.tuwien.dst.mms.dal.query.model.NeighborType;
import at.ac.tuwien.dst.mms.dal.query.model.Neighbors;
import at.ac.tuwien.dst.mms.dal.query.model.TestCoverage;
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

	@RequestMapping(value = "/startLike/{string}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	Iterable<Map<String, Object>> getAllStartingWith(
			@PathVariable String string,
			@RequestParam Integer limit);

	@RequestMapping(value ="/count", method = RequestMethod.GET)
	Long countAll();

	@RequestMapping(value = "/neighbors/{key}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	Neighbors getNeighbors(
			@PathVariable String key,
			@RequestParam boolean downstream,
			@RequestParam boolean upstream,
			@RequestParam List<String> priority,
			@RequestParam List<String> excluded,
			@RequestParam Integer limit,
			@RequestParam List<String> type);

	@RequestMapping(value = "/neighborsSingle/{key}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	Iterable<Map<String, Object>> getNeighborsSingle(
			@PathVariable String key);


	@RequestMapping(value = "/indirect", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	List<T> getByNeighborKey(
			@RequestParam String key,
			@RequestParam String value,
			@RequestParam Integer limit);

	@RequestMapping(value = "/neighborTypes/{key}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	List<NeighborType> getNeighborTypes(
			@PathVariable String key
	);

	@RequestMapping(value ="/coverage/{key}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<TestCoverage> getTestCoverage(
			@PathVariable String key
	);

	@RequestMapping(value ="/bugs/{key}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<BugCoverage> getBugCoverage(
			@PathVariable String key
	);
}
