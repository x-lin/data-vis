package at.ac.tuwien.dst.mms.dal.model;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.GraphProperty;
import org.springframework.data.neo4j.annotation.NodeEntity;

/**
 * //TODO implement
 * Created by xlin on 08.01.2016.
 */
@NodeEntity
public class Requirement {
	@GraphId
	Long id;

	@GraphProperty
	public String key;

	@GraphProperty
	public String name;

	@GraphProperty
	public String self;

	public Requirement() {
	}
}
