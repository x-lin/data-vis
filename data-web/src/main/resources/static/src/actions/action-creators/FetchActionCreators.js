export const ITEM_FETCH_START = "SCHEMA_FETCH_START";
export const ITEM_FETCH_SUCCESS = "ITEM_FETCH_SUCCESS";
export const ITEM_FETCH_ERROR = "ITEM_FETCH_ERROR";

export const ITEMS_CLEAR = "ITEMS_CLEAR";

export const fetchStart = (category, key) => {
    return {
        type: ITEM_FETCH_START,
        category,
        key
    }
};

export const fetchSuccess = (category, key, data) => {
    return {
        type: ITEM_FETCH_SUCCESS,
        category,
        data
    }
};

export const fetchError = (category, key, error) => {
    return {
        type: ITEM_FETCH_ERROR,
        category,
        key,
        error
    }
};

export const clearItems = () => {
    return {
        type: ITEMS_CLEAR
    }
};
