export const NEIGHBORTYPES_FETCH_START = "NEIGHBORTYPES_FETCH_START";
export const NEIGHBORTYPES_FETCH_SUCCESS = "NEIGHBORTYPES_FETCH_SUCCESS";
export const NEIGHBORTYPES_FETCH_ERROR = "NEIGHBORTYPES_FETCH_ERROR";

export const fetchNeighborTypesStart = (node) => {
    return {
        type: NEIGHBORTYPES_FETCH_START,
        node
    }
};

export const fetchNeighborTypesSuccess = (data) => {
    return {
        type: NEIGHBORTYPES_FETCH_SUCCESS,
        data
    }
};

export const fetchNeighborTypesError = (error) => {
    return {
        type: NEIGHBORTYPES_FETCH_ERROR,
        error
    }
};

