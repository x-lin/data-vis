import createAction from "./createAction";

export const NEIGHBORS_FETCH_START = "NEIGHBORS_FETCH_START";
export const NEIGHBORS_FETCH_SUCCESS = "NEIGHBORS_FETCH_SUCCESS";
export const NEIGHBORS_FETCH_ERROR = "NEIGHBORS_FETCH_ERROR";

export const fetchNeighborsStart = (category, key, id) => createAction(
    NEIGHBORS_FETCH_START,
    { category, key, id }
);

export const fetchNeighborsSuccess = (category, key, neighbors, rerender, id) => createAction(
    NEIGHBORS_FETCH_SUCCESS,
    { category, key, neighbors, rerender, id }
);

export const fetchNeighborsError = (category, key, error, id) => createAction(
    NEIGHBORS_FETCH_ERROR,
    { category, key, error, id }
);
