import { ACTIVATE_CONTEXT, DEACTIVATE_CONTEXT, CLEAR_STATE,
        EXPAND_CONTEXT, FILTER_NEIGHBOR_TYPES} from "../actions/action-creators/ContextMenuActions";
import { NEIGHBORTYPES_FETCH_START, NEIGHBORTYPES_FETCH_ERROR, NEIGHBORTYPES_FETCH_SUCCESS }
    from "../actions/action-creators/SearchNeighborTypesActions";

const initialState = {
    context: EXPAND_CONTEXT,
    search: [],
    filterDirection: null,
    neighborTypes: {data: [], node: null, rawData: []},
};

export default (state = initialState, action) => {

    switch(action.type) {
        case ACTIVATE_CONTEXT:
            if(action.context !== state.context) {
                return Object.assign({}, state, {
                    context: action.context
                });
            } else {
                return state;
            }
        case DEACTIVATE_CONTEXT:
            return Object.assign({}, state, {
                context: null,
                search: []
            });
        case CLEAR_STATE:
            return Object.assign({}, state, {
                context: initialState.context,
                search: initialState.search,
                neighborTypes: initialState.neighborTypes,
                filterDirection: null
            });
        case FILTER_NEIGHBOR_TYPES:
            const neighborTypes = state.neighborTypes;
            neighborTypes.data = prepare(neighborTypes.rawData, action.filterDirection);

            return Object.assign({}, state, {
                neighborTypes: neighborTypes,
                filterDirection: action.filterDirection
            })
        case NEIGHBORTYPES_FETCH_ERROR:
        case NEIGHBORTYPES_FETCH_START:
        case NEIGHBORTYPES_FETCH_SUCCESS:
            return neighborTypesReducer(state, action);
        default:
            return state;
    }
};

const neighborTypesReducer = (state, action) => {
    let neighborTypes;

    switch (action.type) {
        case NEIGHBORTYPES_FETCH_START:
            neighborTypes = Object.assign({}, state.neighborTypes, {
                status: NEIGHBORTYPES_FETCH_START,
                node: action.node
            });

            return Object.assign({}, state, {
                neighborTypes
            });
        case NEIGHBORTYPES_FETCH_SUCCESS:
            neighborTypes = Object.assign({}, state.neighborTypes, {
                rawData: action.data,
                data: prepare(action.data),
                error: {},
                status: NEIGHBORTYPES_FETCH_SUCCESS
            });

            return Object.assign({}, state, {
                neighborTypes
            });
        case NEIGHBORTYPES_FETCH_ERROR:
            neighborTypes = Object.assign({}, state, {
                data: [],
                error: action.error,
                status: NEIGHBORTYPES_FETCH_ERROR
            });

            return Object.assign({}, state.neighborTypes, {
                neighborTypes
            });
        default:
            return state;
    }
};

const prepare = (data, filterDirection) => {
    return data.reduce((array, current) => {
        if((filterDirection && current.relationship.indexOf(filterDirection) !== -1) ||
            !filterDirection
        ) {
            const index = array.reduce((val, entry, index) => {
                if(val === -1 && entry.node.key === current.node.key) {
                    return index;
                } else {
                    return val;
                }
            }, -1)

            if(index === -1) {
                array.push(current);
            } else {
                array[index] = Object.assign({}, array[index], {
                    count: current.count + array[index].count,
                    relationship: array[index].relationship.concat(current.relationship[0])
                })
            }

            array.sort((a,b) => {
                return b.count - a.count;
            });
        }

        return array;
    }, [])
}