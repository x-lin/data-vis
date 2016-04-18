import createAction from "./createAction";

export const NEIGHBORTYPES_FETCH_START = "NEIGHBORTYPES_FETCH_START";
export const NEIGHBORTYPES_FETCH_SUCCESS = "NEIGHBORTYPES_FETCH_SUCCESS";
export const NEIGHBORTYPES_FETCH_ERROR = "NEIGHBORTYPES_FETCH_ERROR";

export const fetchNeighborTypesStart = (node) => createAction(
    NEIGHBORTYPES_FETCH_START,
    { node }
);

export const fetchNeighborTypesSuccess = (data) => createAction(
    NEIGHBORTYPES_FETCH_SUCCESS,
    { data }
);

export const fetchNeighborTypesError = (error) => createAction(
    NEIGHBORTYPES_FETCH_ERROR,
    { error }
);
