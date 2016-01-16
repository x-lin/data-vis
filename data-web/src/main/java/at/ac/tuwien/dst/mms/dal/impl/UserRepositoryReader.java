package at.ac.tuwien.dst.mms.dal.impl;

import at.ac.tuwien.dst.mms.dal.repo.UserRepository;
import at.ac.tuwien.dst.mms.dal.util.RepositoryUtils;
import at.ac.tuwien.dst.mms.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by xlin on 15.01.2016.
 */
@Service
public class UserRepositoryReader extends AbstractRepositoryReader<User> {

	@Override
	public List<User> findAll(Integer limit) {
		return ((UserRepository)this.getRepository()).findAll(limit);
	}

	@Override
	public List<User> findMatchingByNeighborKey(String property, String keyValue, int limit) {
		return null;
	}

	@Override
	public List<User> findAllMatching(String name, int limit) {
		return ((UserRepository)this.getRepository()).findAllByName(name, RepositoryUtils.getResultsNr(limit));
	}

	@Override
	public User find(String name) {
		return ((UserRepository)this.getRepository()).findByName(name);

	}
}
