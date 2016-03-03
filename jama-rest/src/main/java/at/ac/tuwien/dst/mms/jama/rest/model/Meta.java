package at.ac.tuwien.dst.mms.jama.rest.model;

/**
 * Created by XLin on 03.03.2016.
 */
public class Meta {
	private PageInfo pageInfo;

	public PageInfo getPageInfo() {
		return pageInfo;
	}

	@Override
	public String toString() {
		return pageInfo.toString();
	}
}
