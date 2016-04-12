export const NEIGHBORS_SINGLE_FETCH_START = "NEIGHBORS_SINGLE_FETCH_START";
export const NEIGHBORS_SINGLE_FETCH_SUCCESS = "NEIGHBORS_SINGLE_FETCH_SUCCESS";
export const NEIGHBORS_SINGLE_FETCH_ERROR = "NEIGHBORS_SINGLE_FETCH_ERROR";

export const fetchNeighborsSingleStart = (node) => {
    return {
        type: NEIGHBORS_SINGLE_FETCH_START,
        node
    }
};

export const fetchNeighborsSingleSuccess = (node, data) => {
    return {
        type: NEIGHBORS_SINGLE_FETCH_SUCCESS,
        data,
        node
    }
};

export const fetchNeighborsSingleError = (node, error) => {
    return {
        type: NEIGHBORS_SINGLE_FETCH_ERROR,
        error,
        node
    }
};

