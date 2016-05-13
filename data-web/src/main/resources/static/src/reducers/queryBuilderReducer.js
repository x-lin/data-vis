import { REHYDRATE } from "redux-persist/constants";

import { BUILDER_ADD_FILTER, BUILDER_ADD_NODE, BUILDER_REMOVE_FILTER, BUILDER_REMOVE_NODE, BUILDER_SET_DIRECTION,
    BUILDER_SET_MAX_PATH_LENGTH, BUILDER_SET_MIN_PATH_LENGTH, BUILDER_TOGGLE_OPTIONAL, BUILDER_TOGGLE_OUTPUT,
    BUILDER_RESET, BUILDER_SET_NODE_TYPE, QUERY_BUILDER_FETCH_ERROR, QUERY_BUILDER_FETCH_START, QUERY_BUILDER_FETCH_SUCCESS,
    BUILDER_ADD_SUB_FILTER, BUILDER_REMOVE_SUB_FILTER, BUILDER_UPDATE_SUB_FILTER, BUILDER_UPDATE_FILTER_OPERATOR,
    BUILDER_UPDATE_SUB_FILTER_OPERATOR, BUILDER_UPDATE }
    from "../actions/action-creators/QueryBuilderActions";

let i = 0;
let filterId = 0;

export const filterTypes = [
    { key: "Type", name: "Type" },
    //{ key: "Property", name: "Property" },
    //{ key: "Hierarchy", name: "Hierarchy" }
];

export const operators = [
    { key: "or", name: "OR" },
    { key: "and", name: "AND" }
];

export const relations = [
    { key: "eq", name: "=" },
    { key: "gr", name: ">" },
    { key: "sm", name: "<" },
    { key: "greq", name: ">=" },
    { key: "smeq", name: "<=" }
];

export const properties = [
    { key: "status", name: "Status (Jama)" },
    { key: "jiraStatus", name: "Status (JIRA)" },
    { key: "version", name: "Release Version" },
    { key: "key", name: "Key" },
    { key: "name", name: "Name" },
    { key: "lastChanged", name: "Last Changed (Jama)" },
    { key: "lastChanged", name: "Last Changed (JIRA)" }
];

export const hierarchy = [
    { key: "leaf", name: "LEAF" },
    { key: "notleaf", name: "NOT LEAF (has children)" }
];

const initSubFilter = () => {
    return {
        filterId: filterId++,
        isNot: false,
        filterType: filterTypes[0],
        relation: relations[0],
        value: {
            key: "SSS",
            name: "System Requirement"
        }
    };
};

const initFilter = () => {
    return {
        filterId: filterId++,
        operator: operators[0],
        filters: [initSubFilter()]
    };
};

const initNode = (node) => {
    return {
        key: node && node.key ? node.key : null,
        type: node && node.type ? node.type : null,
        name: node && node.name ? node.name : null,
        nodeId: i++,
        isOutput: true,
        optional: false,
        filters: {
            filters: [initFilter()],
            operator: operators[0]
        }
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
        edges: [],
        data: {}
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

const addFilter = (state, action) => {
    const { nodes } = state;

    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (node.nodeId === action.nodeId) {
            node.filters.filters.push(initFilter());
            return Object.assign({}, state, {
                nodes: [...nodes.slice(0, i), node, ...nodes.slice(i + 1)]
            });
        }
    }

    return state;
};

const removeFilter = (state, action) => {
    const { nodes } = state;

    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (node.nodeId === action.nodeId) {
            const { filters } = node.filters;

            for (let j = 0; j < filters.length; j++) {
                if (filters[j].filterId === action.filterId) {
                    filters.splice(j, 1);

                    return Object.assign({}, state, {
                        nodes: [...nodes.slice(0, i), node, ...nodes.slice(i + 1)]
                    });
                }
            }
        }
    }

    return state;
};

const removeSubFilter = (state, action) => {
    const { nodes } = state;

    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (node.nodeId === action.nodeId) {
            const { filters } = node.filters;

            for (let j = 0; j < filters.length; j++) {
                if (filters[j].filterId === action.filterId) {
                    const subFilters = filters[j].filters;

                    for (let k = 0; k < subFilters.length; k++) {
                        if (subFilters[k].filterId = action.subFilterId) {
                            subFilters.splice(k, 1);

                            return Object.assign({}, state, {
                                nodes: [...nodes.slice(0, i), node, ...nodes.slice(i + 1)]
                            });
                        }
                    }

                }
            }
        }
    }

    return state;
};

const updateSubFilter = (state, action) => {
    const { nodes } = state;

    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (node.nodeId === action.nodeId) {
            const { filters } = node.filters;

            for (let j = 0; j < filters.length; j++) {
                if (filters[j].filterId === action.filterId) {
                    const subFilters = filters[j].filters;

                    for (let k = 0; k < subFilters.length; k++) {
                        if (subFilters[k].filterId === action.subFilterId) {
                            subFilters[k] = action.data;

                            return Object.assign({}, state, {
                                nodes: [...nodes.slice(0, i), node, ...nodes.slice(i + 1)]
                            });
                        }
                    }

                }
            }
        }
    }

    return state;
};

const addSubFilter = (state, action) => {
    const { nodes } = state;

    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (node.nodeId === action.nodeId) {
            const { filters } = node.filters;

            for (let j = 0; j < filters.length; j++) {
                if (filters[j].filterId === action.filterId) {

                    filters[j].filters.push(initSubFilter());
                    return Object.assign({}, state, {
                        nodes: [...nodes.slice(0, i), node, ...nodes.slice(i + 1)]
                    });
                }
            }
        }
    }

    return state;
};

const updateFilterOperator = (state, action) => {
    const { nodes } = state;

    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (node.nodeId === action.nodeId) {
            node.filters.operator = action.operator;

            return Object.assign({}, state, {
                nodes: [...nodes.slice(0, i), node, ...nodes.slice(i + 1)]
            });
        }
    }

    return state;
};

const updateSubFilterOperator = (state, action) => {
    const { nodes } = state;

    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (node.nodeId === action.nodeId) {
            const { filters } = node.filters;

            for (let j = 0; j < filters.length; j++) {
                if (filters[j].filterId === action.filterId) {
                    filters[j].operator = action.operator;

                    return Object.assign({}, state, {
                        nodes: [...nodes.slice(0, i), node, ...nodes.slice(i + 1)]
                    });
                }
            }
        }
    }

    return state;
};

const update = (state, action) => {
    return action.data;
};

const reset = () => {
    return initState();
};
const createByQueryBuilder = (state, action) => {
    switch(action.type) {
        case QUERY_BUILDER_FETCH_START:
            const obj = {
                id: action.id,
                node: action.data.source,
                data: [],
                status: "START",
                title: action.data.source.name,
                labels: [action.data.source.type],
                type: "Query Builder",
                isCollapsed: false
            };

            return Object.assign({}, state, {
                data: obj
            });
        case QUERY_BUILDER_FETCH_ERROR:
            if (state.data.id === action.id) {
                const obj = Object.assign({}, state.data[i]);
                obj.status = "ERROR";

                return Object.assign({}, state, {
                    error: obj
                });
            }

            return state;
        case QUERY_BUILDER_FETCH_SUCCESS:
            if (state.data.id === action.id) {
                const obj = Object.assign({}, state.data);

                obj.data = action.data;
                obj.status = "SUCCESS";

                return Object.assign({}, state, {
                    data: obj
                });
            }

            return state;
        default:
            return state;
    }
};

const queryBuilderReducer = (state = initState(), action) => {
    switch (action.type) {
        case BUILDER_ADD_NODE:
            return addNode(state, action);
        case BUILDER_REMOVE_NODE:
            return removeNode(state, action);
        case BUILDER_ADD_FILTER:
            return addFilter(state, action);
        case BUILDER_REMOVE_FILTER:
            return removeFilter(state, action);
        case BUILDER_REMOVE_SUB_FILTER:
            return removeSubFilter(state, action);
        case BUILDER_ADD_SUB_FILTER:
            return addSubFilter(state, action);
        case BUILDER_UPDATE_SUB_FILTER:
            return updateSubFilter(state, action);
        case BUILDER_UPDATE_FILTER_OPERATOR:
            return updateFilterOperator(state, action);
        case BUILDER_UPDATE_SUB_FILTER_OPERATOR:
            return updateSubFilterOperator(state, action);
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
        case BUILDER_UPDATE:
            return update(state, action);
        case BUILDER_SET_NODE_TYPE:
            return setNodeType(state, action);
        case REHYDRATE:
            return reset();
        case QUERY_BUILDER_FETCH_START:
        case QUERY_BUILDER_FETCH_ERROR:
        case QUERY_BUILDER_FETCH_SUCCESS:
            return createByQueryBuilder(state, action);
        default:
            return state;
    }
};

export default queryBuilderReducer;
