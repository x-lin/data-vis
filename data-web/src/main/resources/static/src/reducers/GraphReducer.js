import { ADD_TO_GRAPH, REMOVE_FROM_GRAPH, UPDATE_GRAPH, CLEAR_GRAPH, EXPAND_NODE, REDO_GRAPH_ACTION, UNDO_GRAPH_ACTION }
    from "../actions/action-creators/GraphActionCreators";
import { NEIGHBORS_FETCH_START, NEIGHBORS_FETCH_SUCCESS, NEIGHBORS_FETCH_ERROR }
    from "../actions/action-creators/FetchNeighborsActionCreators";
import { REHYDRATE } from "redux-persist/constants";
import Constants from "../config/Constants";
import Edge from "../utils/graph/Edge";
import D3Graph from "../utils/graph/D3Graph";

const UNDO_LIMIT = 10;

function updateHistory(history, graph) {
    let past;

    if(history.length < UNDO_LIMIT) {
        past = [...history, JSON.stringify(graph)];
    } else {
        past = [...history.slice(1), JSON.stringify(graph)];
    }

    return past;
}

const graphActions = [CLEAR_GRAPH, UPDATE_GRAPH, ADD_TO_GRAPH, NEIGHBORS_FETCH_SUCCESS, REMOVE_FROM_GRAPH, EXPAND_NODE];

export const graphReducer = (
state = {
    past: [],
    future: [],
    present: new D3Graph()
},
action) => {
    let past;

    if(graphActions.indexOf(action.type) > -1) {
        past = updateHistory(state.past, state.present);
    }

    switch (action.type) {
        case CLEAR_GRAPH:
            reset(state.present);

            return Object.assign({}, state, {
                past,
                present: Object.assign({}, state.present),
                future: []
            });
        case UPDATE_GRAPH:
            reset(state.present);
            push(state.present, action.data);

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
            if(action.neighbors.neighbors.length > 0 || state.present.nodes.length == 0) {
                const graph = new D3Graph(state.present.nodes, state.present.edges, state.present.legend);

                const node = action.neighbors.node;

                const index = graph.addNode(node);

                action.neighbors.neighbors.forEach((neighbor) => {
                    const neighborIndex = graph.addNode(neighbor);
                    graph.addEdge(new Edge(index, neighborIndex, neighbor.direction));
                });

                return Object.assign({}, state, {
                    present: graph,
                    past,
                    future: []
                });
            } else {
                return state;
            }
        case EXPAND_NODE:
            const graph1 = new D3Graph(state.present.nodes, state.present.edges, state.present.legend);

            const index = graph1.indexOfNode(action.key);
            const neighborIndex = graph1.addNode(action.toNode);
            graph1.addEdge(new Edge(index, neighborIndex, action.toNode.direction));

            return Object.assign({}, state, {
                present: graph1,
                past,
                future: []
            });
        case UNDO_GRAPH_ACTION:
            let previous = prepare(state.past[state.past.length-1]);
            let snapshot1 = JSON.stringify(state.present);

            reset(state.present);
            push(state.present, previous);

            return {
                past: state.past.slice(0, state.past.length - 1),
                present: Object.assign({}, state.present),
                future: [snapshot1, ...state.future]
            };
        case REDO_GRAPH_ACTION:
            let next = prepare(state.future[0]);
            let snapshot = JSON.stringify(state.present);

            reset(state.present);
            push(state.present, next);

            return {
                past: [...state.past, snapshot],
                present: Object.assign({}, state.present),
                future: state.future.slice(1)
            };
        case REHYDRATE:
            const { graph } = action.payload;
            console.log(action.payload);
            if(graph) {
                push(state.present, prepareWithoutParse(graph.present));

                return {
                    past: graph.past,
                    future: graph.future,
                    present: Object.assign({}, state.present)
                };
            } else {
                return state;
            }
        default:
            return state;
    }
};

function push(graph, newGraph) {
    if(newGraph) {
        Array.prototype.push.apply(graph.nodes, newGraph.nodes);
        Array.prototype.push.apply(graph.edges, newGraph.edges);
        Array.prototype.push.apply(graph.legend, new D3Graph(newGraph.nodes, newGraph.edges).legend);
    }
}

function reset(graph) {
    graph.nodes.length = 0;
    graph.edges.length = 0;
    graph.legend.length = 0;
}

function prepareWithoutParse(graph) {
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

function prepare(graph) {
    graph = JSON.parse(graph);

    return prepareWithoutParse(graph);
}