package at.ac.tuwien.dst.mms.dal.util;

import at.ac.tuwien.dst.mms.dal.repo.ProjectRepository;
import at.ac.tuwien.dst.mms.model.NodeType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.repository.GraphRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * This class is a wrapper around the repository classes and can be used to access them in a non-generic way.
 * This is necessary for non-generic classes, as Spring might not be able to find the corresponding beans.
 */
@Service
public class RepositoryService {
	@Autowired
	private ProjectRepository projectRepository;

	private Map<NodeType, GraphRepository> repoMapper;

	public RepositoryService() {
		repoMapper = new HashMap<>();

		repoMapper.put(NodeType.Project, getProjectRepository());
	}

	public GraphRepository getRepository(NodeType type) {
		return repoMapper.containsKey(type) ? repoMapper.get(type) : null;
	}

	public GraphRepository getRepository(String type) {
		return this.getRepository(NodeType.valueOf(type));
	}

	public ProjectRepository getProjectRepository() {
		return projectRepository;
	}
}
