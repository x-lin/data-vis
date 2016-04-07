import { ADD_TO_GRAPH, REMOVE_FROM_GRAPH, UPDATE_GRAPH, CLEAR_GRAPH, EXPAND_NODE }
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
            state.legend.length = 0;

            return Object.assign({}, state);
        case UPDATE_GRAPH:
            state.nodes.length = 0;
            state.edges.length = 0;
            state.legend.length = 0;

            Array.prototype.push.apply(state.nodes, action.data.nodes);
            Array.prototype.push.apply(state.edges, action.data.edges);

            Array.prototype.push.apply(state.legend, new D3Graph(action.data.nodes, action.data.edges).legend);

            return Object.assign({}, state);
        case REMOVE_FROM_GRAPH:
            for(let i=state.edges.length-1; i>=0; i--) {
                if(state.edges[i].source.key === action.key ||
                    state.edges[i].target.key === action.key) {
                    state.edges.splice(i, 1);
                }
            }

            for(let i=0; i<state.nodes.length; i++) {
                if(state.nodes[i].key === action.key) {
                    state.nodes.splice(i, 1);
                    break;
                }
            }

            return new D3Graph(state.nodes, state.edges, state.legend);

        case NEIGHBORS_FETCH_SUCCESS:
            const graph = new D3Graph(state.nodes, state.edges, state.legend);

            const node = action.neighbors.node;

            const index = graph.addNode(node);

            action.neighbors.neighbors.forEach((neighbor) => {
                const neighborIndex = graph.addNode(neighbor);
                graph.addEdge(new Edge(index, neighborIndex));
            });

            return graph;
        case EXPAND_NODE:
            const graph1 = new D3Graph(state.nodes, state.edges, state.legend);
            const fromIndex = graph1.indexOfNode(action.key);
            const toIndex = graph1.addNode(action.toNode);

            graph1.addEdge(new Edge(fromIndex, toIndex));

            return graph1;
        default:
            return state;
    }
};