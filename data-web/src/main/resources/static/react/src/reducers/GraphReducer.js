import { ADD_TO_GRAPH, REMOVE_FROM_GRAPH, UPDATE_GRAPH }
    from "../actions/GraphActions/GraphActionCreators";
import { NEIGHBORS_FETCH_START, NEIGHBORS_FETCH_SUCCESS, NEIGHBORS_FETCH_ERROR }
    from "../actions/ItemActions/FetchNeighborsActionCreators";

import { indexOfObjectInArrayByProperty, indexOfObjectInArrayByProperties } from "../utils/SearchHelpers";
import { keyMap } from "../config/Constants";

export const nodeReducer = (state = {nodes: [], edges: []}, action) => {
    const index = indexOfObjectInArrayByProperty(state.nodes, action.key, "key");


    switch (action.type) {
        case NEIGHBORS_FETCH_START:
            if(index === -1) {
                //console.log("pushing central", action.key);
                const copiedState = Object.assign({}, state);
                copiedState.nodes.push(createNode(action.key, action.category));

                return copiedState;
            } else {
                return state;
            }
        case NEIGHBORS_FETCH_SUCCESS:
            const copiedState = Object.assign({}, state);
            //console.log("action", action);

            for(const neighborCategory in action.neighbors) {
                const neighborNodes = action.neighbors[neighborCategory];
                //console.log("neighbors ", neighborNodes, neighborCategory);
                for(let i = 0; i < neighborNodes.length; i++) {
                    const neighborNode = neighborNodes[i];
                    const keyName = keyMap[neighborCategory];


                    const neighborIndex = indexOfObjectInArrayByProperty(state.nodes, neighborNode[keyName], "key");

                    if(index >= 0 && neighborIndex === -1) {
                        //console.log("keys ", neighborNode[keyName], keyMap[neighborCategory]);
                        //console.log("pusing", neighborNode[keyName]);
                        //neighbor node not in graph -> create neighbor node and connect nodes with edge
                        const edge = createEdge(index, copiedState.nodes.length);
                        copiedState.nodes.push(createNode(neighborNode[keyName], neighborCategory));


                        copiedState.edges.push(edge);
                    } else if(neighborIndex > -1 && neighborIndex !== index ) {
                        const edge = createEdge(index, neighborIndex);

                        if(indexOfObjectInArrayByProperties(state.edges, edge) === -1) {
                            console.log("indices");
                            copiedState.edges.push(edge);
                        }
                    }
                }
            }

            return copiedState;
        case NEIGHBORS_FETCH_ERROR:
        default:
            return state;


    }
};

//action.data should have the format {groupname: [{key:..., }]}
export const graphReducer = (state = {nodes: [], edges: []}, action) => {
    switch (action.type) {
        case NEIGHBORS_FETCH_START:
            return nodeReducer(state, action);
        case NEIGHBORS_FETCH_SUCCESS:
            //console.log("state", state);
            //add nodes to graph through .data and create edges through .key
            return nodeReducer(state, action);
        case NEIGHBORS_FETCH_ERROR:
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