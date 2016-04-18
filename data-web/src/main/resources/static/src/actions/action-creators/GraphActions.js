import createAction from "./createAction";

export const ADD_TO_GRAPH = "ADD_TO_GRAPH";
export const REMOVE_FROM_GRAPH = "REMOVE_FROM_GRAPH";
export const UPDATE_GRAPH = "UPDATE_GRAPH";
export const CLEAR_GRAPH = "CLEAR_GRAPH";
export const EXPAND_NODE = "EXPAND_NODE";
export const UNDO_GRAPH_ACTION = "UNDO_GRAPH_ACTION";
export const REDO_GRAPH_ACTION = "REDO_GRAPH_ACTION";

export const addToGraph = (data) => createAction(
    ADD_TO_GRAPH,
    { data }
);

export const removeFromGraph = (key) => createAction(
    REMOVE_FROM_GRAPH,
    { key }
);

export const updateGraph = (data) => createAction(
    UPDATE_GRAPH,
    { data }
);

export const clearGraph = () => createAction(
    CLEAR_GRAPH
);

export const expandNode = (key, toNode) => createAction(
    EXPAND_NODE,
    { key, toNode }
);

export const undoGraphAction = () => createAction(
    UNDO_GRAPH_ACTION
);

export const redoGraphAction = () => createAction(
    REDO_GRAPH_ACTION
);
