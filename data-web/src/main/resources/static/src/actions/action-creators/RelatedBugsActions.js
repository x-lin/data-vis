import createAction from "./createAction";

export const RELATED_BUGS_FETCH_START = "RELATED_BUGS_FETCH_START ";
export const RELATED_BUGS_FETCH_SUCCESS = "RELATED_BUGS_FETCH_SUCCESS";
export const RELATED_BUGS_FETCH_ERROR = "RELATED_BUGS_FETCH_ERROR";

export const RELATED_BUGS_CLEAR = "RELATED_BUGS_CLEAR";

export const fetchStart = (node, id) => createAction(
    RELATED_BUGS_FETCH_START,
    { node, id }
);

export const fetchSuccess = (key, data, id) => createAction(
    RELATED_BUGS_FETCH_SUCCESS,
    { key, data, id }
);

export const fetchError = (key, error, id) => createAction(
    RELATED_BUGS_FETCH_ERROR,
    { key, error, id }
);

export const clear = () => createAction(
    RELATED_BUGS_CLEAR
);
