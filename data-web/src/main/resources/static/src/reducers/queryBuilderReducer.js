import { REHYDRATE } from "redux-persist/constants";

import { BUILDER_ADD_FILTER, BUILDER_ADD_NODE, BUILDER_REMOVE_FILTER, BUILDER_REMOVE_NODE, BUILDER_SET_DIRECTION,
    BUILDER_SET_MAX_PATH_LENGTH, BUILDER_SET_MIN_PATH_LENGTH, BUILDER_TOGGLE_OPTIONAL, BUILDER_TOGGLE_OUTPUT,
    BUILDER_RESET, BUILDER_SET_NODE_TYPE, QUERY_BUILDER_FETCH_ERROR, QUERY_BUILDER_FETCH_START, QUERY_BUILDER_FETCH_SUCCESS }
    from "../actions/action-creators/QueryBuilderActions";

let i = 0;

const initNode = (node) => {
    const id = i++;

    return {
        nodeId: id,
        key: node ? node.key : "SSS",
        name: node ? node.name : "System Requirement",
        type: node ? node.type : "System Requirement",
        isOutput: false,
        exclude: false,
        filter: []
    };
};

const updateNode = (oldNode, node) => {
    return Object.assign(oldNode, {
        key: node ? node.key : oldNode.key,
        name: node ? node.name : oldNode.name,
        type: node ? (node.type ? node.type : node.name) : oldNode.type
    });
};

const initEdge = (sourceId, targetId) => {
    if (sourceId !== null && typeof sourceId !== "undefined" &&
        targetId !== null && typeof targetId !== "undefined") {
        return {
            sourceId,
            targetId,
            direction: "Downstream",
            minPathLength: 0,
            maxPathLength: 5
        };
    } else {
        return null;
    }
};

const initState = () => {
    i = 0;

    return {
        nodes: [],
        edges: []
    };
};

const addNode = (state, action) => {
    const node = initNode(action.node);
    const edge = initEdge(action.sourceId, node.nodeId);
    return Object.assign({}, state, {
        nodes: [...state.nodes, node],
        edges: edge ? [...state.edges, edge] : state.edges
    });
};

const removeNode = (state, action) => {
    const nodes = state.nodes.filter((node) => {
        return node.nodeId !== action.nodeId;
    });

    const edges = state.edges.filter((edge) => {
        return edge.sourceId !== action.nodeId && edge.targetId !== action.nodeId;
    });

    return Object.assign({}, state, {
        nodes,
        edges
    });
};

const setDirection = (state, action) => {
    const { edges } = state;
    for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];
        if (edge.sourceId === action.sourceId && edge.targetId === action.targetId) {
            edge.direction = action.direction;

            return Object.assign({}, state, {
                edges: [...edges.slice(0, i), edge, ...edges.slice(i + 1)]
            });
        }
    }

    return state;
};

const setMinPathLength = (state, action) => {
    const { edges } = state;
    for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];
        if (edge.sourceId === action.sourceId && edge.targetId === action.targetId) {
            edge.minPathLength = action.length;

            return Object.assign({}, state, {
                edges: [...edges.slice(0, i), edge, ...edges.slice(i + 1)]
            });
        }
    }

    return state;
};

const setMaxPathLength = (state, action) => {
    const { edges } = state;
    for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];
        if (edge.sourceId === action.sourceId && edge.targetId === action.targetId) {
            edge.maxPathLength = action.length;

            return Object.assign({}, state, {
                edges: [...edges.slice(0, i), edge, ...edges.slice(i + 1)]
            });
        }
    }

    return state;
};

const toggleOptional = (state, action) => {
    const { nodes } = state;

    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (node.nodeId === action.nodeId) {
            node.optional = !node.optional;

            return Object.assign({}, state, {
                nodes: [...nodes.slice(0, i), node, ...nodes.slice(i + 1)]
            });
        }
    }

    return state;
};

const toggleOutput = (state, action) => {
    const { nodes } = state;
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (node.nodeId === action.nodeId) {
            node.isOutput = !node.isOutput;

            return Object.assign({}, state, {
                nodes: [...nodes.slice(0, i), node, ...nodes.slice(i + 1)]
            });
        }
    }

    return state;
};

const setNodeType = (state, action) => {
    const { nodes } = state;

    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (node.nodeId === action.nodeId) {
            return Object.assign({}, state, {
                nodes: [...nodes.slice(0, i), updateNode(node, action.node), ...nodes.slice(i + 1)]
            });
        }
    }

    return state;
};

const reset = () => {
    return initState();
};

const queryBuilderReducer = (state = initState(), action) => {
    switch (action.type) {
        case BUILDER_ADD_NODE:
            return addNode(state, action);
        case BUILDER_REMOVE_NODE:
            return removeNode(state, action);
        case BUILDER_ADD_FILTER:
            return state;
        case BUILDER_REMOVE_FILTER:
            return state;
        case BUILDER_SET_DIRECTION:
            return setDirection(state, action);
        case BUILDER_SET_MAX_PATH_LENGTH:
            return setMaxPathLength(state, action);
        case BUILDER_SET_MIN_PATH_LENGTH:
            return setMinPathLength(state, action);
        case BUILDER_TOGGLE_OPTIONAL:
            return toggleOptional(state, action);
        case BUILDER_TOGGLE_OUTPUT:
            return toggleOutput(state, action);
        case BUILDER_RESET:
            return reset();
        case BUILDER_SET_NODE_TYPE:
            return setNodeType(state, action);
        case REHYDRATE:
            return reset();
        case QUERY_BUILDER_FETCH_START:
            return state;
        case QUERY_BUILDER_FETCH_ERROR:
            return state;
        case QUERY_BUILDER_FETCH_SUCCESS:

        default:
            return state;
    }
};

export default queryBuilderReducer;
