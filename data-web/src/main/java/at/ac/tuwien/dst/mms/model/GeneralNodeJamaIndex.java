package at.ac.tuwien.dst.mms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.neo4j.graphdb.Direction;
import org.springframework.data.neo4j.annotation.*;
import org.springframework.data.neo4j.support.index.IndexType;

/**
 * Created by XLin on 07.03.2016.
 */
@NodeEntity
public class GeneralNodeJamaIndex {
	public static final String KEY_INDEX = "jamaIndexNodeIndex";

	@JsonIgnore
	@GraphId
	private Long id;

	@GraphProperty
	@Indexed(unique = true, indexName= KEY_INDEX, indexType = IndexType.FULLTEXT, failOnDuplicate = true)
	private Long jamaId;

	@Fetch
	@RelatedTo(type = "INDEXOF", direction = Direction.OUTGOING)
	private GeneralNode node;

	public GeneralNodeJamaIndex() {}

	public GeneralNodeJamaIndex(Long id, GeneralNode node) {
		this.jamaId = id;
		this.node = node;
	}

	public Long getJamaId() {
		return jamaId;
	}

	public void setJamaId(Long jamaId) {
		this.jamaId = jamaId;
	}

	public GeneralNode getNode() {
		return node;
	}

	public void setNode(GeneralNode node) {
		this.node = node;
	}
}
