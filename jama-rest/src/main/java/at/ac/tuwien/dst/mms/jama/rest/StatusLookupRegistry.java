package at.ac.tuwien.dst.mms.jama.rest;

import at.ac.tuwien.dst.mms.jama.extract.rest.JamaRestClient;
import at.ac.tuwien.dst.mms.jama.extract.rest.message.model.Status;
import com.google.common.collect.Maps;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * @author XLin
 */
@Service
public class StatusLookupRegistry {
    private final Map<Integer, String> statusCache = Maps.newConcurrentMap();

    private final JamaRestClient jamaRestClient;

    @Autowired
    public StatusLookupRegistry( final JamaRestClient jamaRestClient ) {
        this.jamaRestClient = jamaRestClient;
    }

    public String getStatusById( final int statusId ) {
        return this.statusCache.computeIfAbsent( statusId, id -> {
            final Status status = this.jamaRestClient.getStatus( statusId );
            return status.getName();
        } );
    }
}
