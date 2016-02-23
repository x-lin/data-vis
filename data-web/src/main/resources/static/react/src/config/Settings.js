export const ADD_TO_GRAPH_ON_SEARCH = "RENDER_NEW_GRAPH_ON_SEARCH";
export const DISABLED_OPACITY_VALUE = "DISABLED_OPACITY_VALUE";
export const DISABLE_SELECTION_OF_FILTERED_NODES = "DISABLE_SELECTION_OF_FILTERED_NODES";
export const SET_NODE_POSITIONS_FIXED = "SET_NODE_POSITIONS_FIXED";
export const SHOW_CONTEXT_MENU = "SHOW_CONTEXT_MENU";

export default [
    {
        name: ADD_TO_GRAPH_ON_SEARCH,
        description: "Add to current graph on new search.",
        value: false
    }, {
        name: DISABLED_OPACITY_VALUE,
        description: "Set opacity of filtered nodes/edges.",
        value: 0.3,
        min: 0,
        max: 1
    }, {
        name: DISABLE_SELECTION_OF_FILTERED_NODES,
        description: "Disable expansion and context menus of filtered nodes.",
        value: false
    }, {
        name: SET_NODE_POSITIONS_FIXED,
        description: "Disable floating nodes.",
        value: false
    }, {
        name: SHOW_CONTEXT_MENU,
        description: "Show context menu on right click.",
        value: true
    }
];