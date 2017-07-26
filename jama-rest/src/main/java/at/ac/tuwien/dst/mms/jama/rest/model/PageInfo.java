package at.ac.tuwien.dst.mms.jama.rest.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Optional;

/**
 * Created by XLin on 03.03.2016.
 */
public class PageInfo {
    @JsonProperty
	private Integer startIndex;

    @JsonProperty
	private Integer resultCount;

    @JsonProperty
	private Integer totalResults;

	public Optional<Integer> getAndIncrementNextStartIndex() {
		if (hasNextIteration()) {
			startIndex += resultCount;
			return Optional.of(startIndex);
		}
		return Optional.empty();
	}

    private boolean hasNextIteration() {
        return startIndex + resultCount < totalResults;
    }
}
