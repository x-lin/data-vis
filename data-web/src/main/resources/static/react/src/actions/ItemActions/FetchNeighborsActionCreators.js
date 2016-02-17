export const NEIGHBORS_FETCH_START = "NEIGHBORS_FETCH_START";
export const NEIGHBORS_FETCH_SUCCESS = "NEIGHBORS_FETCH_SUCCESS";
export const NEIGHBORS_FETCH_ERROR = "NEIGHBORS_FETCH_ERROR";

export const fetchNeighborsStart = (category, key) => {
    return {
        type: NEIGHBORS_FETCH_START,
        category,
        key
    }
};

export const fetchNeighborsSuccess = (category, key, neighbors) => {
    return {
        type: NEIGHBORS_FETCH_SUCCESS,
        category,
        key,
        neighbors
    }
};

export const fetchNeighborsError = (category, key, error) => {
    return {
        type: NEIGHBORS_FETCH_ERROR,
        category,
        key,
        error
    }
};