package at.ac.tuwien.dst.mms.jama.rest;

import at.ac.tuwien.dst.mms.jama.model.Item;
import at.ac.tuwien.dst.mms.jama.util.Config;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

/**
 * Created by XLin on 04.03.2016.
 */
@Service
public class JamaItemExtractor {
	@Autowired
	private JamaListExtractor extractor;

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	private String itemUri = Config.HOST + "/items";

	public List<Item>  getAllItemsForProject(Integer id) {
		return extractor.getList(getURI(id));
	}

	public Item getItem(Long id) {
		URI uri = URI.create(Config.HOST + "/items/" + id);

		return extractor.get(uri);
	}

	public URI getURI(Integer projectId) {
		return UriComponentsBuilder
				.fromHttpUrl(itemUri)
				.queryParam("project", projectId)
				.build().encode().toUri();
	}
}
