package at.ac.tuwien.dst.mms.jama.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;

/**
 * @author LinX
 */
@Service
public class WebhookSender {
    private final RestTemplate restClient;

    @Autowired
    public WebhookSender( final RestTemplate restClient ) {
        this.restClient = restClient;
    }

    public void send( final String webhookUri, final Object sendData ) {
        this.restClient.postForEntity( URI.create( webhookUri ), sendData, Object.class );
    }
}
