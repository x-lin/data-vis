package at.ac.tuwien.dst.mms.dal.repo;

import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by XLin on 17.03.2016.
 */
@Service
public class NeighborQueryBuilder {
	public String buildQuery(String indexName, String key, boolean upstream, boolean downstream,
							 List<String> excluded, List<String> priority, Integer limit) {
		String query = this.buildStart(indexName, key) + this.buildMatch() + this.buildDownstream(downstream) +
				"-[]-" + this.buildUpstream(upstream) + "(m:GeneralNodeType)" + this.buildExclude(excluded) + this.buildPriority(priority) +
				this.buildLimit(limit);

		System.out.println("query: " + query);

		return query;
	}

	private String buildMatch() {
		return " MATCH (p)-[]-(n:GeneralNode)";
	}

	private String buildStart(String indexName, String key) {
		return "START p=node:" + indexName + "(key='" + key + "')";
	}

	private String buildPriority(List<String> priority) {
		String caseString = "";

		if(priority != null && priority.size() > 0) {
			caseString += " WITH m,n,p, ";
			caseString += " CASE m.key";
			int i = 0;

			for(String p : priority) {
				caseString += " WHEN '" + p + "' THEN " + i;
				i++;
			}

			caseString += " ELSE " + priority.size();
			caseString += " END as sortOrder";
		}

		caseString += " RETURN n";

		if(priority != null && priority.size() > 0) {
			caseString += " ORDER BY sortOrder";
		}

		return caseString;
	}

	private String buildExclude(List<String> excluded) {
		String exclude = "";

		if(excluded != null && excluded.size() > 0) {
			exclude += " WHERE ";

			for(int i = 0; i < excluded.size(); i++) {
				if(i != 0) {
					exclude += " AND";
				}

				exclude += " m.key<>'" + excluded.get(i) + "'";
			}
		}

		return exclude;
	}

	private String buildUpstream(boolean isUpstream) {
		return isUpstream ? ">" : "";
	}

	private String buildDownstream(boolean isDownstream) {
		return isDownstream ? "<" : "";
	}

	private String buildLimit(Integer limit) {
		return limit != null ? " LIMIT " + limit : "";
	}
}
