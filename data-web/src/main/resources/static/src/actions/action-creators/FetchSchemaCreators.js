export const SCHEMA_FETCH_START = "SCHEMA_FETCH_START";
export const SCHEMA_FETCH_SUCCESS = "SCHEMA_FETCH_SUCCESS";
export const SCHEMA_FETCH_ERROR = "SCHEMA_FETCH_ERROR";

export const SCHEMAS_CLEAR = "SCHEMAS_CLEAR";

export const fetchStart = (key) => {
    return {
        type: SCHEMA_FETCH_START,
        key
    }
};

export const fetchSuccess = (key, data) => {
    return {
        type: SCHEMA_FETCH_SUCCESS,
        data
    }
};

export const fetchError = (key, error) => {
    return {
        type: SCHEMA_FETCH_ERROR,
        key,
        error
    }
};

export const clearSchemas = () => {
    return {
        type: SCHEMAS_CLEAR
    }
};
