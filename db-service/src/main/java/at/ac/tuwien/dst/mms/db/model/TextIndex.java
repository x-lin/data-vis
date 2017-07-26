package at.ac.tuwien.dst.mms.db.model;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.GraphProperty;
import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.support.index.IndexType;

/**
 * Created by XLin on 09.03.2016.
 */
@NodeEntity
public class TextIndex extends ModelEntity
{
	public static final String TEXT_INDEX_KEY_INDEX = "textIndexKeyIndex";

	@GraphId
	private Long id;

	@GraphProperty
	@Indexed( unique = true, indexName = TEXT_INDEX_KEY_INDEX, indexType = IndexType.FULLTEXT, failOnDuplicate = true )
	private String key;

	public TextIndex()
	{
	}

	public TextIndex( final String key )
	{
		this.key = key;
	}

	public String getKey()
	{
		return this.key;
	}

	public void setKey( final String key )
	{
		this.key = key;
	}
}
