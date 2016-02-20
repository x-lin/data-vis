export const SEARCH_NEIGHBORS_START = "SEARCH_NEIGHBORS_START";

export const searchNeighborsStart = (category, key) => {
    return {
        type: SEARCH_NEIGHBORS_START,
        category,
        key
    }
};