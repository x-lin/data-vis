export const NODETYPE_FETCH_START = "NODETYPE_FETCH_START";
export const NODETYPE_FETCH_SUCCESS = "NODETYPE_FETCH_SUCCESS";
export const NODETYPE_FETCH_ERROR = "NODETYPE_FETCH_ERROR";

export const fetchNodeTypeStart = () => {
    return {
        type: NODETYPE_FETCH_START,
    }
};

export const fetchNodeTypeSuccess = (data) => {
    return {
        type: NODETYPE_FETCH_SUCCESS,
        data
    }
};

export const fetchNodeTypeError = (error) => {
    return {
        type: NODETYPE_FETCH_ERROR,
        error
    }
};

