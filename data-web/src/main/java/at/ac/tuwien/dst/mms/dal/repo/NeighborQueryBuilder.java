package at.ac.tuwien.dst.mms.dal.repo;

import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by XLin on 17.03.2016.
 */
@Service
public class NeighborQueryBuilder {
	public String buildQuery(String indexName, String key, boolean upstream, boolean downstream,
							 List<String> excluded, List<String> priority, Integer limit, List<String> type) {
		String query = this.buildStart(indexName, key) + this.buildMatch(downstream, upstream) +
				"-[:NODE_TYPE]-(m:GeneralNodeType)" + this.buildOthers() + this.buildType(type) + this.buildExclude(excluded) + this.buildPriority(priority, limit) +
				this.filterClosed() + this.buildLimit(limit);

		System.out.println("query: " + query);

		return query;
	}

	private String buildMatch(boolean downstream, boolean upstream) {
		return " MATCH (p)" + this.buildUpstream(upstream) + "-[r]-" + this.buildDownstream(downstream) + "(n:GeneralNode)";
	}

	private String buildStart(String indexName, String key) {
		return "START p=node:" + indexName + "(key='" + key + "')";
	}

	private String buildType(List<String> type) {
		String typeString = "";

		if(type != null && type.size() > 0) {
			typeString += " AND (";

			for(String t : type) {
				typeString += "m.key = '" + t + "'" + " OR ";
			}

			typeString = typeString.substring(0, typeString.length()-3);
			typeString += ")";
		}

		return typeString;
	}

	private String buildPriority(List<String> priority, Integer limit) {
		String caseString = "";

		if(priority != null && priority.size() > 0) {
			caseString += " WITH m,n,p,r, ";
			caseString += " CASE m.key";
			int i = 0;

			for(String p : priority) {
				caseString += " WHEN '" + p + "' THEN " + i;
				i++;
			}

			caseString += " ELSE " + priority.size();
			caseString += " END as sortOrder";
			caseString += " ORDER BY sortOrder";

			if(limit != null && limit >= 0) {
				caseString += " LIMIT " + limit;
			}
		}

		return caseString;
	}

	private String buildOthers() {
		return " WHERE true ";
	}

	private String buildExclude(List<String> excluded) {
		String exclude = "";

		if(excluded != null && excluded.size() > 0) {
			for(int i = 0; i < excluded.size(); i++) {
				exclude += " AND";
				exclude += " m.key<>'" + excluded.get(i) + "'";
			}
		}

		return exclude;
	}

	private String buildUpstream(boolean isUpstream) {
		return isUpstream ? "<" : "";
	}

	private String buildDownstream(boolean isDownstream) {
		return isDownstream ? ">" : "";
	}

	private String filterClosed() {
		return " OPTIONAL MATCH (n)-[]-(o:GeneralNode) RETURN DISTINCT n AS node, count(o) AS count, CASE " +
				"WHEN (type(r)='DOWNSTREAM' AND (startnode(r) = p) = true) OR type(r)='PROJECT' " +
				"THEN 'DOWNSTREAM' " +
				"WHEN type(r)='UNCLASSIFIED' " +
				"THEN null " +
				"ELSE 'UPSTREAM' END AS direction ";
	}

	private String buildLimit(Integer limit) {
		return (limit == null || limit == -1) ? "" : ("LIMIT " + limit);
	}
}
