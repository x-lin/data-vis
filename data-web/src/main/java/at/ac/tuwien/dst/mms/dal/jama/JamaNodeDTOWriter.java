package at.ac.tuwien.dst.mms.dal.jama;

import at.ac.tuwien.dst.mms.dal.DataWriter;
import at.ac.tuwien.dst.mms.dal.jama.converters.JamaNodeDTOToGeneralNode;
import at.ac.tuwien.dst.mms.dal.jama.dto.JamaNodeDTO;
import at.ac.tuwien.dst.mms.dal.repo.GeneralNodeJamaIndexRepository;
import at.ac.tuwien.dst.mms.dal.repo.GeneralNodeRepository;
import at.ac.tuwien.dst.mms.model.GeneralNode;
import at.ac.tuwien.dst.mms.model.GeneralNodeJamaIndex;
import org.neo4j.graphdb.Transaction;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.core.GraphDatabase;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by XLin on 25.04.2016.
 */
@Service
public class JamaNodeDTOWriter implements DataWriter<JamaNodeDTO> {
	@Autowired
	private GeneralNodeRepository generalNodeRepository;

	@Autowired
	private GeneralNodeJamaIndexRepository generalNodeJamaIndexRepository;

	@Autowired
	private JamaNodeDTOToGeneralNode jamaNodeConverter;

	@Autowired(required = false)
	private Logger logger;

	@Autowired
	private GraphDatabase graphDatabase;

	@Override
	public void write(List<JamaNodeDTO> nodes) {
		try (Transaction tx = graphDatabase.beginTx()) {
			for (JamaNodeDTO node : nodes) {
				this.write(node);
			}

			tx.success();

			logger.info(nodes.size() + " general nodes processed.");
		}
	}

	@Override
	public void write(JamaNodeDTO node) {
		GeneralNode fromDb = generalNodeRepository.findByKey(node.getKey());
		GeneralNode dbNode = fromDb != null ?
				jamaNodeConverter.convert(node, fromDb) : jamaNodeConverter.convert(node);

		if (generalNodeRepository.findByJamaId(node.getJamaId()) == null) {
			generalNodeJamaIndexRepository.save(new GeneralNodeJamaIndex(node.getJamaId(), dbNode));
		}

		generalNodeRepository.save(dbNode);
	}

	@Override
	public void delete(List<JamaNodeDTO> objects) {
		for (JamaNodeDTO node : objects) {
			this.delete(node);
		}
	}

	@Override
	public void delete(JamaNodeDTO node) {
		GeneralNode dbNode = generalNodeRepository.findByJamaId(node.getJamaId());
		GeneralNodeJamaIndex index = generalNodeJamaIndexRepository.findByJamaId(node.getJamaId());

		if (dbNode != null) {
			generalNodeRepository.delete(dbNode);
			generalNodeJamaIndexRepository.delete(index);

			logger.info("Deleted node with jama id " + dbNode.getJamaId());
		}
	}
}
