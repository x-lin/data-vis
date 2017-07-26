package at.ac.tuwien.dst.mms.db.model;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.GraphProperty;
import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.support.index.IndexType;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Created by XLin on 04.03.2016.
 */
@NodeEntity
public class GeneralNodeType extends ModelEntity
{
	public static final String GENERAL_NODE_TYPE_KEY_INDEX = "generalNodeTypeKeyIndex";

	@JsonIgnore
	@GraphId
	private Long id;

	@GraphProperty
	Integer jamaId;

	@GraphProperty
	@Indexed( unique = true, indexName = GENERAL_NODE_TYPE_KEY_INDEX, indexType = IndexType.FULLTEXT,
			failOnDuplicate = true )
	String key;

	@GraphProperty
	String name;

	public GeneralNodeType()
	{
	}

	public GeneralNodeType( final String key, final String name )
	{
		this.key = key;
		this.name = name;
	}

	public Integer getJamaId()
	{
		return this.jamaId;
	}

	public String getKey()
	{
		return this.key;
	}

	public String getName()
	{
		return this.name;
	}

	public void setJamaId( final Integer jamaId )
	{
		this.jamaId = jamaId;
	}

	public void setKey( final String key )
	{
		this.key = key;
	}

	public void setName( final String name )
	{
		this.name = name;
	}
}
