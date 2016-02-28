import { ADD_TO_GRAPH, REMOVE_FROM_GRAPH, UPDATE_GRAPH, CLEAR_GRAPH }
    from "../actions/action-creators/GraphActionCreators";
import { NEIGHBORS_FETCH_START, NEIGHBORS_FETCH_SUCCESS, NEIGHBORS_FETCH_ERROR }
    from "../actions/action-creators/FetchNeighborsActionCreators";
import { TOGGLE_FILTER_ITEM_CATEGORY } from "../actions/action-creators/GraphFilterActionCreators";

import { indexOfObjectInArrayByProperty, indexOfObjectInArrayByProperties } from "../utils/SearchHelpers";
import Comparisons from "../utils/Comparisons";
import Constants from "../config/Constants";
import { store } from "../stores/ReduxStore";
import Edge from "../utils/graph/Edge";
import Node from "../utils/graph/Node";

const nodeReducer = (state, action) => {
    const { existsIndex, isEquals } = Comparisons;

    switch (action.type) {
        case NEIGHBORS_FETCH_SUCCESS:
            let index = indexOfObjectInArrayByProperty(state.nodes, action.key, "key");

            if(!existsIndex(index)) {
                state.nodes.push(new Node(action.key, action.category));
                index = state.nodes.length - 1;
            }

            for(const neighborCategory in action.neighbors) {
                const neighborNodes = action.neighbors[neighborCategory];

                neighborNodes.forEach((neighborNode, i, array) => {
                    const keyIdentifier = Constants.getKeyIdentifier(neighborCategory);
                    const neighborIndex = indexOfObjectInArrayByProperty(state.nodes, neighborNode[keyIdentifier], "key");

                    if(existsIndex(index) && !existsIndex(neighborIndex)) {
                        const edge = new Edge(index, state.nodes.length);
                        const node = new Node(neighborNode[keyIdentifier], neighborCategory);
                        state.edges.push(edge);
                        state.nodes.push(node);
                    } else if(existsIndex(neighborIndex) && !isEquals(neighborIndex, index) ) {
                        const edge = new Edge(index, neighborIndex);

                        if(!checkIfEdgeExists(state.edges, edge)) {
                            state.edges.push(edge);
                        }
                    }
                });
            }

            return Object.assign({}, state);
        case NEIGHBORS_FETCH_ERROR:
            return state;
        default:
            return state;
    }
};

function checkIfEdgeExists(edges, checkedEdge) {
    const { isEquals } = Comparisons;

    for(let j = 0; j < edges.length; j++) {
        const comparedEdge = edges[j];

        if ((isEquals(checkedEdge.source, comparedEdge.target.index) &&
                isEquals(checkedEdge.target, comparedEdge.source.index)) ||
            (isEquals(checkedEdge.source, comparedEdge.source.index) &&
                isEquals(checkedEdge.target, comparedEdge.target.index))) {
            return true;
        }
    }

    return false;
}

const graphFilterReducer = (filterState, action) => {
    if(action.type === TOGGLE_FILTER_ITEM_CATEGORY) {
        if(filterState.hasOwnProperty(action.category)) {
            filterState[action.category] = !filterState[action.category];
        }
    }

    return filterState;
};

export const graphReducer = (
state = {nodes: [], edges: []},
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
            return nodeReducer(state, action);
        default:
            return state;
    }
};