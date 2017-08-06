package at.ac.tuwien.dst.mms.jama.rest;

import at.ac.tuwien.dst.mms.jama.extract.rest.JamaRestClient;
import at.ac.tuwien.dst.mms.jama.extract.rest.message.model.ItemType;
import com.google.common.collect.Maps;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Map;

/**
 */
@Service
public class ItemTypeLookupRegistry {
//    public static Integer FEATURE = 23;
//    public static Integer TICKET = 27;
//    public static Integer REQUIREMENT = 24;
//
//    public static Integer[] PROCESSABLE_IDS= {FEATURE, TICKET, REQUIREMENT};

    private final Map<Integer, ItemType> itemTypes = Maps.newHashMap();

    private final JamaRestClient jamaRestClient;

    @Autowired
    public ItemTypeLookupRegistry( final JamaRestClient jamaRestClient ) {
        this.jamaRestClient = jamaRestClient;
    }

    @PostConstruct
    private void initialize() {
        this.jamaRestClient.getItemTypes().forEach( itemType -> this.itemTypes.put( itemType.getId(), itemType ) );

        //add custom item types
        final ItemType workPackage = new ItemType( -1, "WP", "Work Package" );
        this.itemTypes.put( workPackage.getId(), workPackage );
    }

    public ItemType getItemType( final Integer itemtypeId ) {
        return this.itemTypes.get( itemtypeId );
    }
}
