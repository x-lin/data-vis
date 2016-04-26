package at.ac.tuwien.dst.mms.dal.jama;

import at.ac.tuwien.dst.mms.dal.jama.dto.JamaRelationshipDTO;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Created by XLin on 26.04.2016.
 */
@Service
public class JamaRelationshipTempStorage {
	private Map<Long, Set<Long>> indexFrom;

	private Map<Long, Set<Long>> indexTo;

	public JamaRelationshipTempStorage() {
		this.indexFrom = new HashMap<>();
		this.indexTo = new HashMap<>();
	}

	public void add(JamaRelationshipDTO relationship) {
		Set<Long> tos = this.indexFrom.containsKey(relationship.getFrom()) ?
				this.indexFrom.get(relationship.getFrom()) : new HashSet<>();
		this.indexFrom.put(relationship.getFrom(), tos);

		Set<Long> froms = this.indexTo.containsKey(relationship.getTo()) ?
				this.indexTo.get(relationship.getTo()) : new HashSet<>();
		this.indexTo.put(relationship.getTo(), froms);
	}

	public Set<Long> getTos(Long from) {
		if (this.indexFrom.containsKey(from)) {
			return this.indexFrom.get(from);
		} else {
			return null;
		}
	}

	public Set<Long> getFroms(Long to) {
		if (this.indexTo.containsKey(to)) {
			return this.indexTo.get(to);
		} else {
			return null;
		}
	}

	public void remove(Long from, Long to) {
		Set<Long> tos = indexFrom.get(from);

		if (tos != null && tos.contains(to)) {
			if (tos.size() == 1) {
				indexFrom.remove(from);
			} else {
				tos.remove(to);
			}
		}

		Set<Long> froms = indexTo.get(to);

		if (froms != null && froms.contains(from)) {
			if (froms.size() == 1) {
				indexTo.remove(to);
			} else {
				froms.remove(from);
			}
		}
	}
}
