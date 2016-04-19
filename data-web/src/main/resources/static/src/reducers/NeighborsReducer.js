import { NEIGHBORS_FETCH_START, NEIGHBORS_FETCH_SUCCESS, NEIGHBORS_FETCH_ERROR }
    from "../actions/action-creators/SearchNeighborsActions";

export default (state = { data: [] }, action) => {
    switch (action.type) {
        case NEIGHBORS_FETCH_START:
            return Object.assign({}, state, {
                status: NEIGHBORS_FETCH_START
            });
        case NEIGHBORS_FETCH_SUCCESS:
            return Object.assign({}, state, {
                data: action.data,
                error: {},
                status: NEIGHBORS_FETCH_SUCCESS
            });
        case NEIGHBORS_FETCH_ERROR:
            return Object.assign({}, state, {
                data: [],
                error: action.error,
                status: NEIGHBORS_FETCH_ERROR
            });
        default:
            return state;
    }
};
