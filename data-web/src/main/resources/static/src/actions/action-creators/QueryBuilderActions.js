import createAction from "./createAction";

export const BUILDER_SET_DIRECTION = "BUILDER_SET_DIRECTION";
export const BUILDER_SET_MIN_PATH_LENGTH = "BUILDER_SET_MIN_PATH_LENGTH";
export const BUILDER_SET_MAX_PATH_LENGTH = "BUILDER_SET_MAX_PATH_LENGTH";

export const BUILDER_ADD_FILTER = "BUILDER_ADD_FILTER";
export const BUILDER_REMOVE_FILTER = "BUILDER_REMOVE_FILTER";

export const BUILDER_ADD_NODE = "BUILDER_ADD_NEW_NODE";
export const BUILDER_REMOVE_NODE = "BUILDER_REMOVE_NODE";
export const BUILDER_SET_NODE_TYPE = "BUILDER_SET_NODE_TYPE";

export const BUILDER_TOGGLE_OUTPUT = "BUILDER_TOGGLE_OUTPUT";
export const BUILDER_TOGGLE_OPTIONAL = "BUILDER_TOGGLE_OPTIONAL";

export const BUILDER_RESET = "BUILDER_RESET";

export const QUERY_BUILDER_FETCH_START = "QUERY_BUILDER_FETCH_START";
export const QUERY_BUILDER_FETCH_SUCCESS = "QUERY_BUILDER_FETCH_SUCCESS";
export const QUERY_BUILDER_FETCH_ERROR = "QUERY_BUILDER_FETCH_ERROR";

export const fetchStart = (data, id) => createAction(
    QUERY_BUILDER_FETCH_START,
    { data, id }
);

export const fetchSuccess = (data, id) => createAction(
    QUERY_BUILDER_FETCH_SUCCESS,
    { data, id }
);

export const fetchError = (error, id) => createAction(
    QUERY_BUILDER_FETCH_ERROR,
    { error, id }
);

export const setDirection = (sourceId, targetId, direction) => createAction(
    BUILDER_SET_DIRECTION,
    { sourceId, targetId, direction }
);

export const setMinPathLength = (sourceId, targetId, length) => createAction(
    BUILDER_SET_MIN_PATH_LENGTH,
    { sourceId, targetId, length }
);

export const setMaxPathLength = (sourceId, targetId, length) => createAction(
    BUILDER_SET_MAX_PATH_LENGTH,
    { sourceId, targetId, length }
);

export const addNode = (sourceId, node) => createAction(
    BUILDER_ADD_NODE,
    { sourceId, node }
);

export const removeNode = (nodeId) => createAction(
    BUILDER_REMOVE_NODE,
    { nodeId }
);

export const setNodeType = (nodeId, node) => createAction(
    BUILDER_SET_NODE_TYPE,
    { nodeId, node }
);

export const toggleOutput = (nodeId) => createAction(
    BUILDER_TOGGLE_OUTPUT,
    { nodeId }
);

export const toggleOptional = (nodeId) => createAction(
    BUILDER_TOGGLE_OPTIONAL,
    { nodeId }
);

export const reset = () => createAction(
    BUILDER_RESET
);
