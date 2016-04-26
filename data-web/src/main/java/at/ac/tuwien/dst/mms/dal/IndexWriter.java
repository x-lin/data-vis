package at.ac.tuwien.dst.mms.dal;

import at.ac.tuwien.dst.mms.dal.repo.TextIndexRepository;
import at.ac.tuwien.dst.mms.model.TextIndex;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by XLin on 25.04.2016.
 */
@Service
public class IndexWriter {
	@Autowired
	private TextIndexRepository textIndexRepository;

	public Set<TextIndex> create(Collection<String> toIndex) {
		Set<TextIndex> indices = new HashSet<>();

		for(String indexString : toIndex) {
			TextIndex index = this.create(indexString);
			indices.add(index);
		}

		return indices;
	}

	public TextIndex create(String toIndex) {
		return this.getTextIndex(toIndex);
	}

	private TextIndex getTextIndex(String key) {
		TextIndex indexKey = textIndexRepository.findByKey(key);

		if(indexKey == null) {
			indexKey = new TextIndex(key);
			textIndexRepository.save(indexKey);
		}

		return indexKey;
	}
}
