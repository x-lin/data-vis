package at.ac.tuwien.dst.mms.jira.rest;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.WebResource;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

/**
 * A simple HTTP client for sending REST requests.
 */
public class RestClient {
	private static Logger LOG = LoggerFactory.getLogger(RestClient.class);

	/**
	 * Sends a GET request.
	 *
	 * @param url the URL for the request to be sent to
	 * @return
	 * @throws IOException
	 */
	public static InputStream sendGet(String url) throws IOException {
		HttpClient client = HttpClientBuilder.create().build();
		HttpGet request = new HttpGet(url);
		HttpResponse response = client.execute(request);

		return response.getEntity().getContent();
	}

	/**
	 * Sends a POST request for a generic list.
	 *
	 * @param url
	 * @param requestEntity
	 * @param <T>
	 * @throws IOException
	 */
	public static <T> void sendPost(String url, List<T> requestEntity) throws IOException {
		Client c = Client.create();
		WebResource resource = c.resource(url);

		resource.post(requestEntity);
	}

	/**
	 * Sends a POST request for a generic iterable.
	 *
	 * @param url
	 * @param requestEntity
	 * @param <T>
	 * @throws IOException
	 */
	public static <T> void sendPost(String url, Iterable<T> requestEntity) throws IOException {
		Client c = Client.create();
		WebResource resource = c.resource(url);

		resource.post(requestEntity);
	}
}
