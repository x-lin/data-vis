package at.ac.tuwien.dst.mms.client.rest;

import at.ac.tuwien.dst.mms.dal.repo.GeneralNodeTypeRepository;
import at.ac.tuwien.dst.mms.model.GeneralNodeType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by xlin on 16.01.2016.
 */
@RestController
@RequestMapping("search/nodeTypes")
public class NodeTypeController {
	@Autowired
	GeneralNodeTypeRepository repo;

	@RequestMapping(value = "", method= RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	List<GeneralNodeType> get() {
		return repo.findAll(1000);
	}

}
