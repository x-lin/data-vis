package at.ac.tuwien.dst.mms.jama;

import at.ac.tuwien.dst.mms.config.ConfigProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.json.GsonHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class Application {
    @Bean
    public RestTemplate restTemplate() {
        final RestTemplate restTemplate = ConfigProperties.USER_CREDENTIALS //
                .map( u -> new TestRestTemplate( u.getUsername(), u.getPassword() ) )
                .orElseGet( TestRestTemplate::new ).getRestTemplate();
        restTemplate.getMessageConverters().removeIf( c -> c instanceof MappingJackson2HttpMessageConverter );
        restTemplate.getMessageConverters().add( new GsonHttpMessageConverter() );
        return restTemplate;
    }

    public static void main( final String[] args ) throws Exception {
        SpringApplication.run( Application.class, args );
    }
}