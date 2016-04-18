import { UPSTREAM, DOWNSTREAM } from "../../config/Defaults";
import createAction from "./createAction";

export const ACTIVATE_CONTEXT = "ACTIVATE_CONTEXT";
export const DEACTIVATE_CONTEXT = "DEACTIVATE_CONTEXT";
export const CLEAR_STATE = "CLEAR_STATE";
export const FILTER_NEIGHBOR_TYPES = "FILTER_NEIGHBOR_TYPES";

export const HIDE_CONTEXT = "HIDE_CONTEXT";
export const EXPAND_CONTEXT = "EXPAND_CONTEXT";
export const STATS_CONTEXT = "STATS_CONTEXT";

export const activateContext = (context) => createAction(
    ACTIVATE_CONTEXT,
    { context }
);

export const deactivateContext = () => createAction(
    DEACTIVATE_CONTEXT
);

export const clearState = () => createAction(
    CLEAR_STATE
);

export const filterNeighborTypes = (filterDirection) => createAction(
    FILTER_NEIGHBOR_TYPES,
    {
        filterDirection: (filterDirection === UPSTREAM || filterDirection === DOWNSTREAM)
            ? filterDirection : null
    }
);
