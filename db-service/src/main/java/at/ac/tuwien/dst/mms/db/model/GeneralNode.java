package at.ac.tuwien.dst.mms.db.model;

import java.beans.Transient;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by XLin on 04.03.2016.
 */
@NodeEntity
public class GeneralNode extends ModelEntity
{
	public static final String GENERAL_NODE_KEY_INDEX = "generalNodeKeyIndex";

	@JsonIgnore
	@GraphId
	private Long id;

	@RelatedTo( type = "PROJECT", direction = Direction.INCOMING )
	@Fetch
	@JsonIgnore
	private Project project;

	@GraphProperty
	@JsonProperty
	private Long jamaId;

	@GraphProperty
	@JsonProperty
	private Long jamaParentId;

	private String jiraId;

	@GraphProperty
	@Indexed( unique = true, indexName = GENERAL_NODE_KEY_INDEX, indexType = IndexType.FULLTEXT,
			failOnDuplicate = true )
	@JsonProperty
	private String key;

	@GraphProperty
	@JsonProperty
	private String name;

	@Transient
	private Integer projectId;

	@RelatedTo( type = "NODE_TYPE", direction = Direction.OUTGOING )
	@Fetch
	private GeneralNodeType type;

	@JsonIgnore
	@RelatedTo( type = "PARENT", direction = Direction.INCOMING )
	private GeneralNode parent;

	@JsonIgnore
	@RelatedTo( type = "PARENT", direction = Direction.OUTGOING )
	private Set<GeneralNode> children;

	@JsonIgnore
	@RelatedTo( type = "DOWNSTREAM", direction = Direction.OUTGOING )
	private Set<GeneralNode> downstream;

	@JsonIgnore
	@RelatedTo( type = "UNCLASSIFIED", direction = Direction.BOTH )
	private Set<GeneralNode> unclassified;

	@JsonIgnore
	@RelatedTo( type = "TEXT_INDEX", direction = Direction.OUTGOING )
	private Set<TextIndex> textIndex;

	@JsonProperty
	private String jiraStatus;

	@GraphProperty
	@JsonProperty
	private String status;

	public GeneralNode()
	{
	}

	public GeneralNode( final String key, final String name )
	{
		this.key = key;
		this.name = name;
	}

	public void setJamaId( final Long jamaId )
	{
		this.jamaId = jamaId;
	}

	public void setJamaParentId( final Long jamaParentId )
	{
		this.jamaParentId = jamaParentId;
	}

	public void setKey( final String key )
	{
		this.key = key;
	}

	public void setName( final String name )
	{
		this.name = name;
	}

	public void setStatus( final String status )
	{
		this.status = status;
	}

	public String getStatus()
	{
		return this.status;
	}

	public Set<TextIndex> getTextIndex()
	{
		return this.textIndex;
	}

	public void setTextIndex( final Set<TextIndex> textIndex )
	{
		this.textIndex = textIndex;
	}

	public String getName()
	{
		return this.name;
	}

	public void setJiraStatus( final String jiraStatus )
	{
		this.jiraStatus = jiraStatus;
	}

	public String getJiraId()
	{
		return this.jiraId;
	}

	public void setJiraId( final String jiraId )
	{
		this.jiraId = jiraId;
	}

	public Set<GeneralNode> getUnclassified()
	{
		return this.unclassified;
	}

	public void setUnclassified( final Set<GeneralNode> unclassified )
	{
		this.unclassified = unclassified;
	}

	public void addUnclassified( final GeneralNode node )
	{
		this.unclassified.add( node );
	}

	public Set<GeneralNode> getDownstream()
	{
		return this.downstream;
	}

	public void setDownstream( final Set<GeneralNode> downstream )
	{
		this.downstream = downstream;
	}

	public void addDownstream( final Set<GeneralNode> downstream )
	{
		if ( this.downstream == null )
		{
			this.downstream = new HashSet<>();
		}

		this.downstream.addAll( downstream );
	}

	public void addDownstream( final GeneralNode downstream )
	{
		if ( this.downstream == null )
		{
			this.downstream = new HashSet<>();
		}

		this.downstream.add( downstream );
	}

	public GeneralNode getParent()
	{
		return this.parent;
	}

	public void setParent( final GeneralNode parent )
	{
		this.parent = parent;
	}

	public Set<GeneralNode> getChildren()
	{
		return this.children;
	}

	public void setChildren( final Set<GeneralNode> children )
	{
		this.children = children;
	}

	public void addChildren( final GeneralNode child )
	{
		if ( this.children == null )
		{
			this.children = new HashSet<>();
		}

		this.children.add( child );
	}

	@JsonProperty( "type" )
	public void setType( final GeneralNodeType type )
	{
		this.type = type;
	}

	@JsonIgnore
	public GeneralNodeType getType()
	{
		return this.type;
	}

	@JsonProperty( "type" )
	public String getTypeKey()
	{
		return this.type.getName();
	}

	public String getKey()
	{
		return this.key;
	}

	public Long getJamaParentId()
	{
		return this.jamaParentId;
	}

	public Long getJamaId()
	{
		return this.jamaId;
	}

	public Project getProject()
	{
		return this.project;
	}

	public void setProject( final Project project )
	{
		this.project = project;
	}

	@JsonProperty
	public void setProjectId( final Integer projectId )
	{
		this.projectId = projectId;
	}

	@JsonProperty
	public Integer getProjectId()
	{
		if ( this.project == null )
		{
			return this.projectId;
		}
		else
		{
			return this.project.getJamaId();
		}
	}

	@Override
	public String toString()
	{
		return "GeneralNode{" + "id=" + this.id + ", project=" + this.project + ", jamaId=" + this.jamaId
				+ ", jamaParentId=" + this.jamaParentId + ", jiraId='" + this.jiraId + '\'' + ", key='" + this.key
				+ '\'' + ", name='" + this.name + '\'' + ", projectId=" + this.projectId + ", type=" + this.type
				+ ", parent=" + this.parent + ", children=" + this.children + ", downstream=" + this.downstream
				+ ", unclassified=" + this.unclassified + ", textIndex=" + this.textIndex + ", jiraStatus='"
				+ this.jiraStatus + '\'' + ", status='" + this.status + '\'' + '}';
	}
}
