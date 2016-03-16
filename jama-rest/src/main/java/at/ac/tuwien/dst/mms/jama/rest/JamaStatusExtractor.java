package at.ac.tuwien.dst.mms.jama.rest;

import at.ac.tuwien.dst.mms.jama.rest.model.StatusResponse;
import at.ac.tuwien.dst.mms.jama.util.Config;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

/**
 * Created by XLin on 14.03.2016.
 */
@Service
public class JamaStatusExtractor {
	@Autowired
	private RestTemplate restTemplate;

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	private String statusUri = Config.HOST + "/picklistoptions";

	public synchronized String getStatus(Integer id) {
		URI uri = UriComponentsBuilder
				.fromHttpUrl(statusUri)
				.path("/" + id)
				.build().encode().toUri();

		logger.info("Requesting status for id " + id);

		//TODO Doesn't return response when multiple projects are extracting concurrently!!!
		String status = restTemplate.getForObject(uri, StatusResponse.class).getStatus().getName();

		return status;
	}
}
