package at.ac.tuwien.dst.mms.jama.rest;

import at.ac.tuwien.dst.mms.jama.model.Relationship;
import at.ac.tuwien.dst.mms.jama.util.Config;
import com.google.common.collect.ImmutableList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

/**
 * Created by XLin on 07.03.2016.
 */
@Service
public class JamaRelationshipExtractor {
	@Autowired
	private JamaListExtractor extractor;

	private String relationshipUri = Config.HOST + "/relationships";

	public URI getDownstreamURI(Long itemId) {
		return UriComponentsBuilder
				.fromHttpUrl(Config.HOST + "/items")
				.path("/" + itemId)
				.path("/downstreamrelationships")
				.build().encode().toUri();
	}

	public URI getUpstreamURI(Long itemId) {
		return UriComponentsBuilder
				.fromHttpUrl(Config.HOST + "/items")
				.path("/" + itemId)
				.path("/upstreamrelationships")
				.build().encode().toUri();
	}

	public List<Relationship> getAllRelationshipsForItem(Long itemId) {
		ImmutableList.Builder<Relationship> relationships = ImmutableList.builder();
		relationships.addAll(extractor.getList(getUpstreamURI(itemId))).addAll(extractor.getList(getDownstreamURI(itemId)));
		return relationships.build();
	}
}
