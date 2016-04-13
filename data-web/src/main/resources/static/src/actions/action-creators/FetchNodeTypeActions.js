import createAction from "./createAction";

export const NODETYPE_FETCH_START = "NODETYPE_FETCH_START";
export const NODETYPE_FETCH_SUCCESS = "NODETYPE_FETCH_SUCCESS";
export const NODETYPE_FETCH_ERROR = "NODETYPE_FETCH_ERROR";

export const fetchNodeTypeStart = () => createAction(
    NODETYPE_FETCH_START
);

export const fetchNodeTypeSuccess = (data) => createAction(
    NODETYPE_FETCH_SUCCESS,
    { data }
);

export const fetchNodeTypeError = (error) => createAction(
    NODETYPE_FETCH_ERROR,
    { error }
);
