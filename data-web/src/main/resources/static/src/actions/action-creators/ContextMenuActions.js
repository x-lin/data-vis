export const ACTIVATE_CONTEXT = "ACTIVATE_CONTEXT";
export const DEACTIVATE_CONTEXT = "DEACTIVATE_CONTEXT";
export const CLEAR_STATE = "CLEAR_STATE";
export const FILTER_NEIGHBOR_TYPES = "FILTER_NEIGHBOR_TYPES";

export const HIDE_CONTEXT = "HIDE_CONTEXT";
export const EXPAND_CONTEXT = "EXPAND_CONTEXT";
export const STATS_CONTEXT = "STATS_CONTEXT";

export const activateContext = (context) => {
    return {
        type: ACTIVATE_CONTEXT,
        context
    }
};

export const deactivateContext = () => {
    return {
        type: DEACTIVATE_CONTEXT
    }
};

export const clearState = () => {
    return {
        type: CLEAR_STATE
    }
};

export const filterNeighborTypes = (filterDirection) => {
    console.log("before dir", filterDirection);

    const dir = (filterDirection === "UPSTREAM" || filterDirection === "DOWNSTREAM") ? filterDirection : null;

    console.log("dir", dir);

    return {
        type: FILTER_NEIGHBOR_TYPES,
        filterDirection : dir
    }
}