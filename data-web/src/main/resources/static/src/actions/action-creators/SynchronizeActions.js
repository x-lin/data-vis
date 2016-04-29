import createAction from "./createAction";

export const SYNCHRONIZE_START = "SYNCHRONIZE_START ";
export const SYNCHRONIZE_SUCCESS = "SYNCHRONIZE_SUCCESS";
export const SYNCHRONIZE_ERROR = "SYNCHRONIZE_ERROR";

export const fetchStart = (nodes) => createAction(
    SYNCHRONIZE_START,
    { nodes }
);

export const fetchSuccess = (data) => createAction(
    SYNCHRONIZE_SUCCESS,
    { data }
);

export const fetchError = (error) => createAction(
    SYNCHRONIZE_ERROR,
    { error }
);
