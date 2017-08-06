package at.ac.tuwien.dst.mms.jama.rest;

import at.ac.tuwien.dst.mms.jama.extract.rest.JamaRestClient;
import at.ac.tuwien.dst.mms.jama.extract.rest.message.model.Activity;
import at.ac.tuwien.dst.mms.jama.extract.rest.message.model.Item;
import at.ac.tuwien.dst.mms.jama.extract.rest.message.model.Project;
import at.ac.tuwien.dst.mms.jama.extract.rest.message.model.Relationship;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author XLin
 */
@RestController
public class JamaController {
    private final Logger logger = LoggerFactory.getLogger( this.getClass() );

    private final JamaRestClient jamaRestClient;

    private final WebhookSender webhookSender;

    @Autowired
    public JamaController( final JamaRestClient restClient, final WebhookSender webhookSender ) {
        this.jamaRestClient = restClient;
        this.webhookSender = webhookSender;
    }

    @RequestMapping( value = "/projects", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE )
    List<Project> getAllProjects(
//            @RequestParam("webhook") String webhook
    ) {
        final List<Project> projects = this.jamaRestClient.getProjects();
        return projects.stream().filter( p -> !p.isFolder() && p.isProject() ).collect( Collectors.toList() );
    }

    @RequestMapping( value = "/items", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE )
    List<Item> getItems(
            @RequestParam( "project" ) final Integer projectId,
            @RequestParam( value = "webhook", required = false ) final String webhook
    ) {
        //List<JamaItem> items = jamaInstance.getData
        final List<Item> items = this.jamaRestClient.getAllItemsForProject( projectId );
        this.getForItems( items );

        final boolean isWebhook = ( webhook != null && webhook.length() > 0 );

        if ( isWebhook ) {
            //restTemplate.postForEntity(webhook, pvcsb, Object.class);
            this.webhookSender.send( webhook, items );
            return new ArrayList<>();
        } else {
            return items;
        }
    }

    @RequestMapping( value = "/item/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE )
    public Item getItem(
            @PathVariable( "id" ) final Long id
    ) {
        final Item item = this.jamaRestClient.getItem( id );

        if ( item != null ) {
            this.logger.info( "item with id " + item.getId() + " is: " + item.toString() );
        }

        return item;
    }

    @RequestMapping( value = "/item/{id}/relationships", method = RequestMethod.GET, produces = MediaType
            .APPLICATION_JSON_VALUE )
    public List<Relationship> getRelationships(
            @PathVariable( "id" ) final Long id
    ) {
        return this.jamaRestClient.getAllRelationshipsForItem( id );
    }

    private List<Item> getForItems( final List<Item> items ) {
        final List<Item> filteredItems = new ArrayList<>();

        for ( final Item item : items ) {
            if ( item.getStatus() == null ||
                    ( item.getStatus() != null && !item.getStatus().equals( "Deleted" ) && !item.getStatus().equals(
                            "Rejected" ) ) ) {
                filteredItems.add( item );

                if ( item.getItemType().getKey().equals( "FEAT" ) && ( item.getKey().contains( "-WP-" ) || item
                        .getName().trim().startsWith( "[WP]" ) ) ) {
                    this.logger.info( "is work package" );
                    item.setItemType( -1 );
                }

                this.extractRelationships( item );
            }
        }

        return filteredItems;
    }

    private void extractRelationships( final Item item ) {
        if ( item.getItemType() != null && !item.getItemType().getKey().equals( "FLD" ) && !item.getItemType().getKey
                ().equals( "SET" ) ) {
            final List<Relationship> initialResponse = this.jamaRestClient.getAllRelationshipsForItem( item
                    .getId() );
            RelationshipsTempStorage.get().add( initialResponse );
        } else {
            this.logger.info( "Folder or Set detected, not extracting." );
        }
    }

    @RequestMapping( value = "/relationships", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE )
    List<Relationship> getRelationships(
            @RequestParam( "project" ) final Integer projectId,
            @RequestParam( value = "webhook", required = false ) final String webhook
    ) {

        //List<Relationship> relationships = relationshipSerializer.read("relationships_pvcsc.txt");
        //List<Relationship> relationships = relationshipSerializer.read("relationships_pvcsb.txt");
        final List<Relationship> relationships = RelationshipsTempStorage.get().getAll();

        final boolean isWebhook = ( webhook != null && webhook.length() > 0 );

        if ( isWebhook ) {
            this.webhookSender.send( webhook, relationships );

            return new ArrayList<>();
        } else {
            return relationships;
        }
    }

    @RequestMapping( value = "/activities", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE )
    List<Activity> getActivities(
            @RequestParam( "project" ) final Long projectId,
            @RequestParam( value = "dateFrom" ) @DateTimeFormat( iso = DateTimeFormat.ISO.DATE_TIME ) final Date
                    dateFrom,
            @RequestParam( value = "dateTo", required = false ) @DateTimeFormat( iso = DateTimeFormat.ISO.DATE_TIME )
            final Date dateTo,
            @RequestParam( value = "webhook", required = false ) final String webhook
    ) {

        final List<Activity> activities = this.jamaRestClient.getActivities( projectId, dateFrom, dateTo );

        final boolean isWebhook = ( webhook != null && webhook.length() > 0 );

        if ( isWebhook ) {

            this.webhookSender.send( webhook, activities );

            return new ArrayList<>();
        } else {
            return activities;
        }
    }

    @Async
    private void add( final List<Activity> activities, final List<Item> items, final List<Relationship> relationships
    ) {
        for ( final Activity activity : activities ) {
            final Item item = this.jamaRestClient.getItem( activity.getItemId() );

            if ( item != null ) {
                items.add( item );
                relationships.addAll( this.jamaRestClient.getAllRelationshipsForItem( activity.getItemId() ) );
            }
        }
    }

    @Async
    private void addProjects( final Project project, final Date dateFrom, final Date dateTo, final List<Item> items,
                              final List<Relationship> relationships ) {
        final List<Activity> activities = getActivities( project.getId(), dateFrom, dateTo, null );
        this.add( activities, items, relationships );
    }

    @RequestMapping( value = "/update", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE )
    List<Object> getUpdates(
            @RequestParam( value = "relWebhook", required = false ) final String relWebhook,
            @RequestParam( value = "itemWebhook", required = false ) final String itemWebhook,
            @RequestParam( value = "dateFrom" ) @DateTimeFormat( iso = DateTimeFormat.ISO.DATE_TIME ) final Date
                    dateFrom,
            @RequestParam( value = "dateTo", required = false ) @DateTimeFormat( iso = DateTimeFormat.ISO.DATE_TIME )
            final Date dateTo,
            @RequestParam( value = "project", required = false ) final List<Long> projectIds
    ) {
        final List<Project> projects = null;
        //List<Project> projects = this.getAllProjects();
        final List<Item> items = new ArrayList<>();
        final List<Relationship> relationships = new ArrayList<>();

        if ( projectIds == null || projectIds.size() == 0 ) {
            for ( final Project project : projects ) {
                this.addProjects( project, dateFrom, dateTo, items, relationships );
            }
        } else {
            projectIds.forEach( id -> {
                final List<Activity> activities = getActivities( id, dateFrom, dateTo, null );
                this.add( activities, items, relationships );
            } );
        }

        this.logger.info( "Finished fetching all updates starting from " + dateFrom.toString() + ( dateTo != null ? "" +
                " until " + dateTo.toString() : "" ) );

        if ( relWebhook == null || itemWebhook == null ) {
            final List<Object> objects = new ArrayList<>();
            objects.addAll( items );
            objects.addAll( relationships );

            return objects;
        } else {
            this.webhookSender.send( itemWebhook, items );
            this.webhookSender.send( relWebhook, items );
            return null;
        }
    }
}
