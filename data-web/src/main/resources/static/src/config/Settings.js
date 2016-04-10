export const ADD_TO_GRAPH_ON_SEARCH = "RENDER_NEW_GRAPH_ON_SEARCH";
export const DISABLED_OPACITY_VALUE = "DISABLED_OPACITY_VALUE";
export const ENABLE_SELECTION_OF_FILTERED_NODES = "ENABLE_SELECTION_OF_FILTERED_NODES";
export const SET_NODE_POSITIONS_FIXED = "SET_NODE_POSITIONS_FIXED";
export const SHOW_CONTEXT_MENU = "SHOW_CONTEXT_MENU";
export const CHANGE_GRAPH_LAYOUT ="CHANGE_GRAPH_LAYOUT";
export const SHOW_EDGE_DIRECTION = "SHOW_EDGE_DIRECTION";

export const FORCE_GRAPH_LAYOUT = "FORCE_GRAPH_LAYOUT";
export const CIRCULAR_LAYOUT = "CIRCULAR_LAYOUT";
export const TREE_LAYOUT = "TREE_LAYOUT";

export default [
    {
        name: ADD_TO_GRAPH_ON_SEARCH,
        description: "Add to current graph on new search.",
        value: false,
        menuButton: "fa fa-plus"
    }, {
        name: DISABLED_OPACITY_VALUE,
        description: "Set opacity of filtered nodes/edges.",
        value: 0.3,
        min: 0,
        max: 0.5,
        step: 0.05,
        menuButton: "fa fa-eye-slash"
    }, {
        name: SHOW_EDGE_DIRECTION,
        description: "Show direction of edges.",
        value: false,
        menuButton: "fa fa-arrows-v"
    }, {
        name: ENABLE_SELECTION_OF_FILTERED_NODES,
        description: "Enable event handlers for filtered nodes.",
        value: true,
        menuButton: "fa fa-mail-forward"
    }, {
        name: SET_NODE_POSITIONS_FIXED,
        description: "Pin nodes.",
        value: false,
        menuButton: "fa fa-thumb-tack"
    }, {
        name: SHOW_CONTEXT_MENU,
        description: "Show custom context menu on right click.",
        value: true,
        menuButton: "fa fa-list-alt"
    }, {
        name: CHANGE_GRAPH_LAYOUT,
        description: "Change the layout of the graph visualization.",
        value: FORCE_GRAPH_LAYOUT,
        options: [
            {key: FORCE_GRAPH_LAYOUT, description: "Force-directed"},
            {key: CIRCULAR_LAYOUT, description: "Circular (experimental)"}
        ],
        menuButton: "fa fa-picture-o"
    }
];