package at.ac.tuwien.dst.mms.jama.extract.rest;

import at.ac.tuwien.dst.mms.config.ConfigProperties;
import at.ac.tuwien.dst.mms.jama.extract.rest.message.model.*;
import at.ac.tuwien.dst.mms.jama.extract.rest.message.response.ListResponse;
import at.ac.tuwien.dst.mms.jama.extract.rest.message.response.SingleResponse;
import com.google.common.collect.ImmutableList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * Created by XLin on 04.03.2016.
 */
@Service
public class JamaRestClient {
    private static final Logger LOG = LoggerFactory.getLogger( JamaRestClient.class );

    private static final int MAX_RESULTS = 50;

    private static final String ACTIVITIES_URI = ConfigProperties.JAMA_URI + "/activities";

    private static final String ITEM_URI = ConfigProperties.JAMA_URI + "/items";

    private static final URI PROJECTS_URI = URI.create( ConfigProperties.JAMA_URI + "/projects" );

    private static final URI ITEMTYPES_URI = URI.create( ConfigProperties.JAMA_URI + "/itemtypes" );

    private final RestTemplate restClient;

    @Autowired
    public JamaRestClient( final RestTemplate restClient ) {
        this.restClient = restClient;
    }

    public List<Item> getAllItemsForProject( final Integer projectId ) {
        return this.getAllFromListResponses( getItemUriForProject( projectId ), ListResponse.ItemsResponse.class );
    }

    public Item getItem( final Long id ) {
        final URI uri = URI.create( ITEM_URI + "/" + id );
        return this.getSingleResponse( uri, SingleResponse.SingleItemResponse.class );
    }

    public List<Project> getProjects() {
        return this.getAllFromListResponses( PROJECTS_URI, ListResponse.ProjectsResponse.class );
    }

    public List<Activity> getActivities( final Long projectId, final Date dateFrom, final Date dateTo ) {
        return this.getAllFromListResponses( getActivitesUri( projectId, dateFrom, dateTo ), ListResponse
                .ActivitiesResponse
                .class );
    }

    public List<Relationship> getAllRelationshipsForItem( final Long itemId ) {
        final ImmutableList.Builder<Relationship> relationships = ImmutableList.builder();
        relationships
                .addAll( this.getAllFromListResponses( getUpstreamUri( itemId ), ListResponse.RelationshipsResponse
                        .class ) )
                .addAll( this.getAllFromListResponses( getDownstreamUri( itemId ), ListResponse.RelationshipsResponse
                        .class ) );
        return relationships.build();
    }

    public Status getStatus( final int statusId ) {
        return this.getSingleResponse( getStatusUri( statusId ), SingleResponse.SingleStatusResponse.class );
    }

    public List<ItemType> getItemTypes() {
        return getAllFromListResponses( ITEMTYPES_URI, ListResponse.ItemTypesResponse.class );
    }

    private <T> List<T> getAllFromListResponses( final URI uri, final Class<? extends ListResponse<T>> messageClass ) {
        return getAllFromListResponses( 0, uri, messageClass );
    }

    private <T> List<T> getAllFromListResponses( final int startIndex, final URI uri, final Class<? extends
            ListResponse<T>> messageClass ) {
        final ListResponse<T> response = this.getListResponse( startIndex, uri, messageClass );
        return response.getPageInfo().getAndIncrementNextStartIndex().map( s -> {
            List<T> next = getAllFromListResponses( s, uri, messageClass );
            Optional.ofNullable( response.getData() ).ifPresent( next::addAll );
            return next;
        } ).orElseGet( response::getData );
    }

    private <T> T getSingleResponse( final URI uri, final Class<? extends SingleResponse<T>> messageClass ) {
        LOG.info( "Requesting data from {}.", uri );
        return this.restClient.exchange( uri, HttpMethod.GET, null, messageClass ).getBody().getData();
    }

    private <T> ListResponse<T> getListResponse( final int startAt, final URI baseUri, final Class<? extends
            ListResponse<T>> messageClass ) {
        final URI uri = getListResponseStartingFrom( startAt, baseUri );
        LOG.info( "Requesting list from {}.", uri );
        return this.restClient.exchange( uri, HttpMethod.GET, null, messageClass ).getBody();
    }

    private static URI getListResponseStartingFrom( final int startAt, final URI baseUri ) {
        return UriComponentsBuilder
                .fromUri( baseUri )
                .queryParam( "maxResults", MAX_RESULTS )
                .queryParam( "startAt", startAt )
                .build().encode().toUri();
    }

    private static URI getDownstreamUri( final long itemId ) {
        return getRelationshipUri( itemId, "downstreamrelationships" );
    }

    private static URI getUpstreamUri( final long itemId ) {
        return getRelationshipUri( itemId, "upstreamrelationships" );
    }

    private static URI getRelationshipUri( final long itemId, final String relationshipTypePath ) {
        return UriComponentsBuilder
                .fromHttpUrl( ConfigProperties.JAMA_URI + "/items" )
                .path( "/" + itemId )
                .path( "/" + relationshipTypePath )
                .build().encode().toUri();
    }

    private static URI getActivitesUri( final Long projectId, final Date dateFrom, final Date dateTo ) {
        final UriComponentsBuilder builder = UriComponentsBuilder
                .fromHttpUrl( ACTIVITIES_URI )
                .queryParam( "project", projectId )
                .queryParam( "objectType", ObjectType.ITEM )
                .queryParam( "objectType", ObjectType.RELATIONSHIP );

        Optional.ofNullable( dateFrom ).ifPresent( from -> builder.queryParam( "date", dateToString( from ) ) );
        Optional.ofNullable( dateTo ).ifPresent( to -> builder.queryParam( "date", dateToString( to ) ) );

        return builder.build().encode().toUri();
    }

    private static String dateToString( final Date date ) {
        final DateFormat df = new SimpleDateFormat( "yyyy-MM-dd'T'HH:mm:ss.SSSZ" );
        return df.format( date );
    }

    private URI getStatusUri( final int statusId ) {
        return UriComponentsBuilder
                .fromHttpUrl( ConfigProperties.JAMA_URI + "/picklistoptions" )
                .path( "/" + statusId )
                .build().encode().toUri();
    }

    private static URI getItemUriForProject( final Integer projectId ) {
        return UriComponentsBuilder
                .fromHttpUrl( ITEM_URI )
                .queryParam( "project", projectId )
                .build().encode().toUri();
    }
}
