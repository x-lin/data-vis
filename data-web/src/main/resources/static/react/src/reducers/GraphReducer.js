import { ADD_TO_GRAPH, REMOVE_FROM_GRAPH, UPDATE_GRAPH, CLEAR_GRAPH }
    from "../actions/action-creators/GraphActionCreators";
import { NEIGHBORS_FETCH_START, NEIGHBORS_FETCH_SUCCESS, NEIGHBORS_FETCH_ERROR }
    from "../actions/action-creators/FetchNeighborsActionCreators";
import { TOGGLE_FILTER_ITEM_CATEGORY } from "../actions/action-creators/GraphFilterActionCreators";

import { indexOfObjectInArrayByProperty, indexOfObjectInArrayByProperties } from "../utils/SearchHelpers";
import Constants from "../config/Constants";
import { store } from "../stores/ReduxStore";

import { combineReducers } from "redux";

const nodeReducer = (state, action) => {
    switch (action.type) {
        case NEIGHBORS_FETCH_SUCCESS:
            const copiedState = Object.assign({}, state);
            let index = indexOfObjectInArrayByProperty(state.nodes, action.key, "key");

            if(index === -1) {
                copiedState.nodes.push(createNode(action.key, action.category));
                index = copiedState.nodes.length - 1;
            }

            for(const neighborCategory in action.neighbors) {
                const neighborNodes = action.neighbors[neighborCategory];

                for(let i = 0; i < neighborNodes.length; i++) {
                    const neighborNode = neighborNodes[i];
                    const keyName = Constants.keyMap[neighborCategory];
                    const neighborIndex = indexOfObjectInArrayByProperty(state.nodes, neighborNode[keyName], "key");

                    if(index >= 0 && neighborIndex === -1) {
                        const edge = createEdge(index, copiedState.nodes.length);
                        copiedState.edges.push(edge);

                        copiedState.nodes.push(createNode(neighborNode[keyName], neighborCategory));
                    } else if(neighborIndex > -1 && neighborIndex !== index ) {
                        const edge = createEdge(index, neighborIndex);

                        //TODO issue here, as D3 updates the source/edge values, so comparing indices doesn't work
                        //TODO add check for reverse edge
                        if(indexOfObjectInArrayByProperties(state.edges, edge) === -1
                            ) {
                            copiedState.edges.push(edge);
                        }
                    }
                }
            }

            return copiedState;
        case NEIGHBORS_FETCH_ERROR:
            return state;
        default:
            return state;
    }
};

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
            state = action.data;
        case NEIGHBORS_FETCH_SUCCESS:
            return nodeReducer(state, action);
        default:
            return state;
    }
};

const createNode = function(key, category) {
    var node = {};
    node.key = key;
    node.category = category;

    return node;
};

const createEdge = function(sourceIndex, targetIndex) {
    var edge = {};
    edge.source = sourceIndex;
    edge.target = targetIndex;

    return edge;
};