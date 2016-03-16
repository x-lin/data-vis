package at.ac.tuwien.dst.mms.jama.rest;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by XLin on 14.03.2016.
 */
public class StatusLookupRegistry {
	private final Map<Integer, String> statusMap;

	private JamaStatusExtractor extractor;

	public StatusLookupRegistry(JamaStatusExtractor extractor) {
		statusMap = new HashMap<>();
		this.extractor = extractor;
	}

	public synchronized String getStatusById(Integer id) {
		String status = this.statusMap.get(id);

		if(status == null) {
			status = extractor.getStatus(id);
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
