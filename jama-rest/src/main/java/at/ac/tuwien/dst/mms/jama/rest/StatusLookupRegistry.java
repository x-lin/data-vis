package at.ac.tuwien.dst.mms.jama.rest;

import at.ac.tuwien.dst.mms.jama.rest.model.Status;
import at.ac.tuwien.dst.mms.jama.util.Config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author XLin
 */
public class StatusLookupRegistry {
	private final Map<Integer, String> statusMap;

	private JamaListExtractor extractor;


	public StatusLookupRegistry(JamaListExtractor extractor) {
		statusMap = new HashMap<>();
		this.extractor = extractor;
	}

	public synchronized String getStatusById(Integer id) {
		String status = this.statusMap.get(id);

		if(status == null) {
			String result;

			//TODO Doesn't return response when multiple projects are extracting concurrently!!!

			synchronized (extractor) {
				String statusUri = Config.HOST + "/picklistoptions";
				URI uri = UriComponentsBuilder
                        .fromHttpUrl(statusUri)
                        .path("/" + id)
                        .build().encode().toUri();

				Status status1 = extractor.get(uri);
				result = status1.getName();
			}
			status = result;
			this.statusMap.put(id, status);
		}

		return status;
	}

	private static StatusLookupRegistry instance;

	public static void set(StatusLookupRegistry registry) {
		if(instance == null) {
			instance = registry;
		}
	}

	public static StatusLookupRegistry get() {
		return instance;
	}
}
