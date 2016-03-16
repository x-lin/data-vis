package at.ac.tuwien.dst.mms.jama.rest;

import at.ac.tuwien.dst.mms.jama.model.Relationship;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by XLin on 14.03.2016.
 */
public class RelationshipsTempStorage {
	private List<Relationship> relationships;

	public RelationshipsTempStorage() {
		this.relationships = new ArrayList<>();
	}

	public void add(List<Relationship> relationships) {
		this.relationships.addAll(relationships);
	}

	public List<Relationship> getAll() {
		return this.relationships;
	}

	private static final RelationshipsTempStorage storage = new RelationshipsTempStorage();

	public static RelationshipsTempStorage get() {
		return storage;
	}
}
