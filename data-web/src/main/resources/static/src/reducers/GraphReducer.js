import { ADD_TO_GRAPH, REMOVE_FROM_GRAPH, UPDATE_GRAPH, CLEAR_GRAPH }
    from "../actions/action-creators/GraphActionCreators";
import { NEIGHBORS_FETCH_START, NEIGHBORS_FETCH_SUCCESS, NEIGHBORS_FETCH_ERROR }
    from "../actions/action-creators/FetchNeighborsActionCreators";

import Constants from "../config/Constants";
import Edge from "../utils/graph/Edge";
import Node from "../utils/graph/Node";
import D3Graph from "../utils/graph/D3Graph";

export const graphReducer = (
state = new D3Graph(),
action) => {

    switch (action.type) {
        case CLEAR_GRAPH:
            state.nodes.length = 0;
            state.edges.length = 0;

            return state;
        case UPDATE_GRAPH:
            state.nodes.length = 0;
            state.edges.length = 0;
            Array.prototype.push.apply(state.nodes, action.data.nodes);
            Array.prototype.push.apply(state.edges, action.data.edges);

            return Object.assign({}, state);
        case NEIGHBORS_FETCH_SUCCESS:
            const graph = new D3Graph(state.nodes, state.edges);

            const index = graph.addNode(new Node(action.key, action.category));

            for(const neighborCategory in action.neighbors) {
                const neighborNodes = action.neighbors[neighborCategory];

                neighborNodes.forEach((neighborNode) => {
                    const keyIdentifier = Constants.getKeyIdentifier(neighborCategory);
                    const neighborIndex = graph.addNode(new Node(neighborNode[keyIdentifier], neighborCategory));
                    graph.addEdge(new Edge(index, neighborIndex));
                });
            }

            return graph;
        default:
            return state;
    }
};