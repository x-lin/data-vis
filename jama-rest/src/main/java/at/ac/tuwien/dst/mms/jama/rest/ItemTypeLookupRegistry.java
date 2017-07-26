package at.ac.tuwien.dst.mms.jama.rest;

import at.ac.tuwien.dst.mms.jama.model.ItemType;
import at.ac.tuwien.dst.mms.jama.util.Config;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
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

    private final Map<Integer, ItemType> itemTypes;

    public ItemTypeLookupRegistry(JamaListExtractor extractor) {
        itemTypes = new HashMap<>();

        URI uri = URI.create(Config.HOST + "/itemtypes");
        for(ItemType itemType : extractor.<ItemType>getList(uri)) {
            itemTypes.put(itemType.getJamaId(), itemType);
        }

        //add custom item types
        ItemType workPackage = new ItemType();
        workPackage.setJamaId(-1);
        workPackage.setKey("WP");
        workPackage.setName("Work Package");

        itemTypes.put(workPackage.getJamaId(), workPackage);
    }

    public ItemType getItemType(Integer itemtypeId) {
        return itemTypes.get(itemtypeId);
    }

    private static ItemTypeLookupRegistry instance;

    public static void set(ItemTypeLookupRegistry registry) {
        if(instance == null) {
            instance = registry;
        }
    }

    public static ItemTypeLookupRegistry get() {
        return instance;
    }
}
