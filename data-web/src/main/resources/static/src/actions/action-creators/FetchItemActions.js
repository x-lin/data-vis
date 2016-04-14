import createAction from "./createAction";

export const ITEM_FETCH_START = "SCHEMA_FETCH_START";
export const ITEM_FETCH_SUCCESS = "ITEM_FETCH_SUCCESS";
export const ITEM_FETCH_ERROR = "ITEM_FETCH_ERROR";

export const ITEMS_CLEAR = "ITEMS_CLEAR";

export const fetchStart = (category, key) => createAction(
    ITEM_FETCH_START,
    { category, key }
);

export const fetchSuccess = (category, key, data) => createAction(
    ITEM_FETCH_SUCCESS,
    { category, data, key }
);

export const fetchError = (category, key, error) => createAction(
    ITEM_FETCH_ERROR,
    {category, key, error}
);

export const clearItems = () => createAction(
    ITEMS_CLEAR
);