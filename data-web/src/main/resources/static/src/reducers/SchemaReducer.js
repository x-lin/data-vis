import { SCHEMA_FETCH_ERROR, SCHEMA_FETCH_START, SCHEMA_FETCH_SUCCESS }
    from "../actions/action-creators/FetchSchemaCreators";

export const schemaReducer = (state = {edges: [], nodes: []}, action) => {
    switch (action.type) {
        case SCHEMA_FETCH_START:
            return Object.assign({}, state, {
                status: SCHEMA_FETCH_START
            });
        case SCHEMA_FETCH_SUCCESS:
            state.nodes.length = 0;
            state.edges.length = 0;

            const { nodes, edges } = action.data;
            const nodeIndex = {};
            const edgeTotal = calculateTotalSize(edges);
            const nodeTotal = calculateTotalSize(nodes);

            nodes.forEach((node, index) => {
                nodeIndex[node.key] = index;
                node.total = nodeTotal;
            });

            edges.forEach((edge) => {
                edge.source = nodeIndex[edge.source];
                edge.target = nodeIndex[edge.target];
                edge.total = edgeTotal;
            });

            Array.prototype.push.apply(state.nodes, action.data.nodes);
            Array.prototype.push.apply(state.edges, action.data.edges);

            return Object.assign({}, state, {
                error: {},
                status: SCHEMA_FETCH_SUCCESS
            });
        case SCHEMA_FETCH_ERROR:
            return Object.assign({}, state, {
                data: [],
                error: action.error,
                status: SCHEMA_FETCH_ERROR
            });
        default:
            return state;
    }
};

function calculateTotalSize(array) {
    return array.reduce((newVal, obj) => {
        return obj.count + newVal;
    }, 0)
}