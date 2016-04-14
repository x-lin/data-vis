import createAction from "./createAction";

export const SEARCH_NEIGHBORS_START = "SEARCH_NEIGHBORS_START";

export const searchNeighborsStart = (category, key) => createAction(
    SEARCH_NEIGHBORS_START,
    { category, key }
);