import { NODETYPE_FETCH_START, NODETYPE_FETCH_ERROR, NODETYPE_FETCH_SUCCESS }
    from "../actions/action-creators/FetchNodeTypeActionCreators";

export default (state = {data: []}, action) => {
    switch (action.type) {
        case NODETYPE_FETCH_START:
            return Object.assign({}, state, {
                status: NODETYPE_FETCH_START
            });
        case NODETYPE_FETCH_SUCCESS:
            return Object.assign({}, state, {
                data: action.data,
                error: {},
                status: NODETYPE_FETCH_SUCCESS
            });
        case NODETYPE_FETCH_ERROR:
            return Object.assign({}, state, {
                data: [],
                error: action.error,
                status: NODETYPE_FETCH_ERROR
            });
        default:
            return state;
    }
};