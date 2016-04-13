import createAction from "./createAction";

export const SCHEMA_FETCH_START = "SCHEMA_FETCH_START";
export const SCHEMA_FETCH_SUCCESS = "SCHEMA_FETCH_SUCCESS";
export const SCHEMA_FETCH_ERROR = "SCHEMA_FETCH_ERROR";

export const SCHEMAS_CLEAR = "SCHEMAS_CLEAR";

export const fetchStart = (key) => createAction(
    SCHEMA_FETCH_START,
    { key }
);

export const fetchSuccess = (key, data) => createAction(
    SCHEMA_FETCH_SUCCESS,
    { data }
);

export const fetchError = (key, error) => createAction(
    SCHEMA_FETCH_ERROR,
    { key, error }
);

export const clearSchemas = () => createAction(
    SCHEMAS_CLEAR
);