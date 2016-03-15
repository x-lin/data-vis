package at.ac.tuwien.dst.mms.model;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by xlin on 14.01.2016.
 */
public enum NodeType {
	Issue,
	Project,
	Requirement,
	User,
	GeneralNode,
	GeneralNodeType;

	private static Map<NodeType, Class> typeMapper;

	static {
		typeMapper = new HashMap<>();
		typeMapper.put(NodeType.Issue, Issue.class);
		typeMapper.put(NodeType.Requirement, Requirement.class);
		typeMapper.put(NodeType.Project, Project.class);
		typeMapper.put(NodeType.User, User.class);
		typeMapper.put(NodeType.GeneralNode, GeneralNode.class);
		typeMapper.put(NodeType.GeneralNodeType, GeneralNodeType.class);
	}

	/**
	 * Maps a model type to a class. This is done as a convenience method, so we can e.g. send Neo4j queries with
	 * results of multiple types where the types are then mapped automatically accordingly.
	 */
	public static Class<?> getClass(NodeType type) {
		Class<?> clazz = null;

		if (typeMapper.containsKey(type)) {
			clazz = typeMapper.get(type);
		}

		return clazz;
	}

	public static Class<?> getClass(String type) {
		Class<?> clazz = null;

		if (typeMapper.containsKey(NodeType.valueOf(type))) {
			clazz = typeMapper.get(NodeType.valueOf(type));
		}

		return clazz;
	}


}
