import { ADD_TO_GRAPH, REMOVE_FROM_GRAPH, UPDATE_GRAPH, CLEAR_GRAPH, EXPAND_NODE, REDO_GRAPH_ACTION, UNDO_GRAPH_ACTION }
    from "../actions/action-creators/GraphActionCreators";
import { NEIGHBORS_FETCH_START, NEIGHBORS_FETCH_SUCCESS, NEIGHBORS_FETCH_ERROR }
    from "../actions/action-creators/FetchNeighborsActionCreators";
import Constants from "../config/Constants";
import Edge from "../utils/graph/Edge";
import Node from "../utils/graph/Node";
import D3Graph from "../utils/graph/D3Graph";

//export const undoRedoReducer = ({
//    past: [],
//    present: {},
//    future: []
//}, action) => {
//    switch(action.type) {
//        case UNDO_GRAPH_ACTION:
//            return state;
//        case REDO_GRAPH_ACTION:
//            return state;
//        default:
//            return state;
//            //pass to graphReducer
//            //check for difference of return state
//    }
//};

export const graphReducer = (
state = {
    past: [],
    future: [],
    present: new D3Graph()
},
action) => {
    let past = [...state.past, JSON.stringify(state.present)];

    switch (action.type) {
        case CLEAR_GRAPH:
            state.present.nodes.length = 0;
            state.present.edges.length = 0;
            state.present.legend.length = 0;

            return Object.assign({}, state, {
                past,
                present: Object.assign({}, state.present),
                future: []
            });
        case UPDATE_GRAPH:
            state.present.nodes.length = 0;
            state.present.edges.length = 0;
            state.present.legend.length = 0;

            Array.prototype.push.apply(state.present.nodes, action.data.nodes);
            Array.prototype.push.apply(state.present.edges, action.data.edges);

            Array.prototype.push.apply(state.present.legend, new D3Graph(action.data.nodes, action.data.edges).legend);

            return Object.assign({}, state, {
                past,
                present: Object.assign({}, state.present),
                future: []
            });
        case REMOVE_FROM_GRAPH:
            let edges = state.present.edges;
            let nodes = state.present.nodes;

            for(let i=edges.length-1; i>=0; i--) {
                if(edges[i].source.key === action.key ||
                    edges[i].target.key === action.key) {
                    edges.splice(i, 1);
                }
            }

            for(let i=0; i<nodes.length; i++) {
                if(nodes[i].key === action.key) {
                    nodes.splice(i, 1);
                    break;
                }
            }

            return Object.assign({}, state, {
                present: new D3Graph(nodes, edges),
                past,
                future: []
            });

        case NEIGHBORS_FETCH_SUCCESS:
            //TODO don't add to history, if no neighbors
            const graph = new D3Graph(state.present.nodes, state.present.edges, state.present.legend);

            const node = action.neighbors.node;

            const index = graph.addNode(node);

            action.neighbors.neighbors.forEach((neighbor) => {
                const neighborIndex = graph.addNode(neighbor);
                graph.addEdge(new Edge(index, neighborIndex));
            });

            return Object.assign({}, state, {
                present: graph,
                past,
                future: []
            });
        case EXPAND_NODE:
            const graph1 = new D3Graph(state.present.nodes, state.present.edges, state.present.legend);
            const fromIndex = graph1.indexOfNode(action.key);
            const toIndex = graph1.addNode(action.toNode);

            graph1.addEdge(new Edge(fromIndex, toIndex));

            return Object.assign({}, state, {
                present: graph1,
                past,
                future: []
            });
        case UNDO_GRAPH_ACTION:
            let previous = prepare(state.past[state.past.length-1]);
            let snapshot1 = JSON.stringify(state.present);

            state.present.nodes.length = 0;
            state.present.edges.length = 0;
            state.present.legend.length = 0;

            Array.prototype.push.apply(state.present.nodes, previous.nodes);
            Array.prototype.push.apply(state.present.edges, previous.edges);
            Array.prototype.push.apply(state.present.legend, new D3Graph(previous.nodes, previous.edges).legend);

            return {
                past: state.past.slice(0, state.past.length - 1),
                present: Object.assign({}, state.present),
                future: [snapshot1, ...state.future]
            };
        case REDO_GRAPH_ACTION:
            let next = prepare(state.future[0]);
            let snapshot = JSON.stringify(state.present);

            state.present.nodes.length = 0;
            state.present.edges.length = 0;
            state.present.legend.length = 0;

            Array.prototype.push.apply(state.present.nodes, next.nodes);
            Array.prototype.push.apply(state.present.edges, next.edges);
            Array.prototype.push.apply(state.present.legend, new D3Graph(next.nodes, next.edges).legend);

            return {
                past: [...state.past, snapshot],
                present: Object.assign({}, state.present),
                future: state.future.slice(1)
            };
        default:
            return state;
    }
};

function prepare(graph) {
    graph = JSON.parse(graph);

    //set isFixed value, as it's not saved in file
    graph.nodes = graph.nodes.map((node, index) => {
        node.isFixed = (node.fixed && node.fixed==1) ? true : false;
        return node;
    });

    //resetting edges to indices, otherwise D3 will not recognize and render the edges
    //this way D3 creates the references to the nodes itself
    graph.edges = graph.edges.map((edge, index) => {
        if(typeof edge.source.index !== "undefined" && typeof edge.target.index !== "undefined") {
            edge.source = edge.source.index;
            edge.target = edge.target.index;
        }

        return edge;
    });

    return graph;
}