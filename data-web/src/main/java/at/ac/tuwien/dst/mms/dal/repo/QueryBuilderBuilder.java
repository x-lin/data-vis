package at.ac.tuwien.dst.mms.dal.repo;

import at.ac.tuwien.dst.mms.dal.query.model.Edge;
import at.ac.tuwien.dst.mms.dal.query.model.Filter;
import at.ac.tuwien.dst.mms.dal.query.model.Node;
import at.ac.tuwien.dst.mms.dal.query.model.SubFilter;
import at.ac.tuwien.dst.mms.model.GeneralNode;
import org.neo4j.cypherdsl.Path;
import org.neo4j.cypherdsl.PathRelationship;
import org.neo4j.cypherdsl.expression.BooleanExpression;
import org.neo4j.cypherdsl.expression.Expression;
import org.neo4j.cypherdsl.grammar.Match;
import org.neo4j.cypherdsl.grammar.Return;
import org.neo4j.cypherdsl.grammar.StartNext;
import org.neo4j.cypherdsl.grammar.Where;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.neo4j.cypherdsl.CypherQuery.*;

/**
 * Created by XLin on 06.05.2016.
 */
public class QueryBuilderBuilder {
	private Node source;
	private List<Node> nodes;
	private List<Edge> edges;

	private NameBuilder nameBuilder;

	private Map<String, Node> outputs = new HashMap<>();

	public QueryBuilderBuilder(Node source, List<Node> nodes, List<Edge> edges) {
		this.source = source;
		this.nodes = nodes;
		this.edges = edges;

		this.nameBuilder = new NameBuilder("node");
	}

	public String buildQuery() {
		String startNodeVar = nameBuilder.getName();
		StartNext start = buildStart(startNodeVar);
		Where match = this.buildMatch(source, startNodeVar, start);
		Return returns = this.buildReturn(match);

		String query = returns.toString();

		System.out.println("query: " + query);

		return query;
	}

	private Return buildReturn(Where match) {
		List<Expression> identifiers = new ArrayList<>();

		for (Map.Entry<String, Node> output : outputs.entrySet()) {
			identifiers.add(as(identifier(output.getKey()), output.getKey()));
		}

		if(identifiers.size() > 0) {
			identifiers.set(0, distinct(identifiers.get(0)));
		}

		return match.returns(identifiers);
	}

	private Where buildMatch(Node matchNode, String matchNodeVar, Where whereClause) {
		Edge edge = this.getEdge(matchNode);

		if (edge.getTargetId() != null) {
			Node targetNode = this.getNode(edge.getTargetId());
			String targetNodeVar = nameBuilder.getName();
			String typeVar = nameBuilder.getName();

			if (targetNode.isOutput()) {
				outputs.put(targetNodeVar, targetNode);
			}

			Match match;

			if (whereClause == null) {
				match = match(
						this.buildPath(edge.getMinPathLength(), edge.getMaxPathLength(), edge.getDirection(), matchNodeVar, targetNodeVar),
						node(targetNodeVar)
								.both("NODE_TYPE")
								.node(typeVar)
								.label("GeneralNodeType")
				);
			} else {
				match = whereClause
						.with()
						.match(
								this.buildPath(edge.getMinPathLength(), edge.getMaxPathLength(), edge.getDirection(), matchNodeVar, targetNodeVar),
								node(targetNodeVar)
										.both("NODE_TYPE")
										.node(typeVar)
										.label("GeneralNodeType")
						);
			}

			if (targetNode.isOptional()) {
				match = match.optional();
			}

			BooleanExpression exp = null;

			for (Filter filter : targetNode.getFilters().getFilters()) {
				BooleanExpression subExp = null;

				for (SubFilter subFilter : filter.getFilters()) {
					System.out.println("sub filter" + subFilter.toString());

					if (subExp == null) {
						subExp = identifier(typeVar)
								.string("key")
								.eq(subFilter.getValue().getKey());
					} else {
						if (filter.getOperator().getKey().equals("or")) {
							subExp = subExp.or(identifier(typeVar)
									.string("key")
									.eq(subFilter.getValue().getKey()));
						} else if (filter.getOperator().getKey().equals("and")) {
							subExp = subExp.and(identifier(typeVar)
									.string("key")
									.eq(subFilter.getValue().getKey()));
						}
					}

				}

				if (subExp != null) {
					if (exp == null) {
						exp = subExp;
					} else {
						if (targetNode.getFilters().getOperator().getKey().equals("or")) {
							exp = exp.or(subExp);
						} else if (targetNode.getFilters().getOperator().getKey().equals("and")) {
							exp = exp.and(subExp);
						}
					}
				}
			}

			Where where = match.where(
					exp
			);

			return this.buildMatch(targetNode, targetNodeVar, where);
		} else {
			return whereClause;
		}
	}

//	private BooleanExpression concatFilters(BooleanExpression oldExp, String operator, boolean isStart) {
//
//	}

	private StartNext buildStart(String var) {
		return start(
				lookup(var, GeneralNode.GENERAL_NODE_KEY_INDEX, "key", source.getKey())
		);
	}

	private Path buildPath(int minLength, int maxLength, String direction, String matchNode, String matchedNode) {
		Path node = node(matchNode);
		PathRelationship rel;

		switch (direction) {
			case "Upstream":
				rel = node.in("DOWNSTREAM", "UNCLASSIFIED");
				break;
			case "Downstream":
				rel = node.out("DOWNSTREAM", "UNCLASSIFIED");
				break;
			default:
				rel = node.both("DOWNSTREAM", "UNCLASSIFIED");
				break;
		}

		return rel
				.hops(minLength, maxLength)
				.node(matchedNode)
				.label("GeneralNode");
	}

	private Node getNode(int id) {
		for (Node node : nodes) {
			if (node.getNodeId() == id) {
				return node;
			}
		}

		return new Node();
	}

//	private List<Edge> filterEdges(Node node) {
//		List<Edge> filteredEdges = new ArrayList<>();
//
//		for (Edge edge : edges) {
//			if(edge.getSourceId() == node.getNodeId()) {
//				filteredEdges.add(edge);
//			}
//		}
//
//		return filteredEdges;
//	}

	private Edge getEdge(Node node) {
		for (Edge edge : edges) {
			if(edge.getSourceId() == node.getNodeId()) {
				return edge;
			}
		}

		return new Edge();
	}

	private class NameBuilder {
		private final String prefix;
		private int counter;

		public NameBuilder(String prefix) {
			counter = 0;
			this.prefix = prefix;
		}

		private String getName() {
			this.increment();
			return prefix + counter;
		}

		private void increment() {
			counter++;
		}
	}
}
