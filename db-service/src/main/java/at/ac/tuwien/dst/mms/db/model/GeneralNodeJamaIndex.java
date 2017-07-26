package at.ac.tuwien.dst.mms.db.model;

import org.neo4j.graphdb.Direction;
import org.springframework.data.neo4j.annotation.Fetch;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.GraphProperty;
import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.annotation.RelatedTo;
import org.springframework.data.neo4j.support.index.IndexType;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Created by XLin on 07.03.2016.
 */
@NodeEntity
public class GeneralNodeJamaIndex
{
	public static final String KEY_INDEX = "jamaIndexNodeIndex";

	@JsonIgnore
	@GraphId
	private Long id;

	@GraphProperty
	@Indexed( unique = true, indexName = KEY_INDEX, indexType = IndexType.FULLTEXT, failOnDuplicate = true )
	private Long jamaId;

	@Fetch
	@RelatedTo( type = "INDEXOF", direction = Direction.OUTGOING )
	private GeneralNode node;

	public GeneralNodeJamaIndex()
	{
	}

	public GeneralNodeJamaIndex( final Long id, final GeneralNode node )
	{
		this.jamaId = id;
		this.node = node;
	}

	public Long getJamaId()
	{
		return this.jamaId;
	}

	public void setJamaId( final Long jamaId )
	{
		this.jamaId = jamaId;
	}

	public GeneralNode getNode()
	{
		return this.node;
	}

	public void setNode( final GeneralNode node )
	{
		this.node = node;
	}
}
