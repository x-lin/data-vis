export const ADD_TO_GRAPH = "ADD_TO_GRAPH";
export const REMOVE_FROM_GRAPH = "REMOVE_FROM_GRAPH";
export const UPDATE_GRAPH = "UPDATE_GRAPH";
export const CLEAR_GRAPH = "CLEAR_GRAPH";

export const addToGraph = (data) => {
    return {
        type: ADD_TO_GRAPH,
        data: data
    }
};

export const removeFromGraph = (key) => {
    return {
        type: REMOVE_FROM_GRAPH,
        key: key
    }
};

export const updateGraph = (data) => {
    return {
        type: UPDATE_GRAPH,
        data: data
    }
};

export const clearGraph = () => {
    return {
        type: CLEAR_GRAPH
    }
};