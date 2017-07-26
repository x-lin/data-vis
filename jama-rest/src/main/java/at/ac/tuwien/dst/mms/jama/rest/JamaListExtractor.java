package at.ac.tuwien.dst.mms.jama.rest;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import at.ac.tuwien.dst.mms.jama.rest.model.ListResponse;
import at.ac.tuwien.dst.mms.jama.rest.model.SingleResponse;
import at.ac.tuwien.dst.mms.jama.util.Config;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;


public class JamaListExtractor
{
	private static Logger LOG = LoggerFactory.getLogger(JamaListExtractor.class);

	@Autowired
	private RestTemplate restTemplate;

	public <T> T get(URI uri) {
		LOG.info("Fetching data instance from {}.", uri);

		return restTemplate.exchange(uri, HttpMethod.GET, null, new ParameterizedTypeReference<SingleResponse<T>>() {
		}).getBody().get();
	}

	public <T> List<T> getList(URI uri) {
		return getList(0, uri);
	}

	private <T> List<T> getList(int startIndex, URI uri) {
			ListResponse<T> response = this.getResponse(startIndex, uri);
			return response.getPageInfo().getAndIncrementNextStartIndex().map(s -> {
				List<T> next = getList(s, uri);
				Optional.ofNullable(response.get()).ifPresent(next::addAll);
				return next;
			}).orElse(response.get());
	}

	private <T> ListResponse<T> getResponse(int startAt, URI baseUri) {
		URI uri = UriComponentsBuilder
				.fromUri(baseUri)
				.queryParam("maxResults", Config.MAX_RESULTS)
				.queryParam("startAt", startAt)
				.build().encode().toUri();

		LOG.info("Requesting list from {} starting at {}", baseUri, startAt);

		return restTemplate.exchange(uri, HttpMethod.GET, null, new ParameterizedTypeReference<ListResponse<T>>() {
		}).getBody();
	}
}
