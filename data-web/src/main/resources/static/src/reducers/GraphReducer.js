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
            console.log("clearing graph");
            state.nodes.length = 0;
            state.edges.length = 0;
            state.legend.length = 0;

            return Object.assign({}, state);
        case UPDATE_GRAPH:
            console.log("updating graph");
            state.nodes.length = 0;
            state.edges.length = 0;
            state.legend.length = 0;

            Array.prototype.push.apply(state.nodes, action.data.nodes);
            Array.prototype.push.apply(state.edges, action.data.edges);

            Array.prototype.push.apply(state.legend, new D3Graph(action.data.nodes, action.data.edges).legend);

            return Object.assign({}, state);
        case NEIGHBORS_FETCH_SUCCESS:
            console.log("fetching neighbors");
            const graph = new D3Graph(state.nodes, state.edges, state.legend);

            const node = action.neighbors.node;

            const index = graph.addNode(node);

            action.neighbors.neighbors.forEach((neighbor) => {
                const neighborIndex = graph.addNode(neighbor);
                graph.addEdge(new Edge(index, neighborIndex));
            });

            return graph;
        default:
            return state;
    }
};