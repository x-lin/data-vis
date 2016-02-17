import { ITEM_FETCH_START, ITEM_FETCH_SUCCESS, ITEM_FETCH_ERROR }
    from "../actions/ItemActions/FetchActionCreators";

export const itemReducer = (state = {data: [], error: {}}, action) => {
    switch (action.type) {
        case ITEM_FETCH_START:
            return Object.assign({}, state, {
                status: ITEM_FETCH_START,
                error: {}
            });
        case ITEM_FETCH_SUCCESS:
            return Object.assign({}, state, {
                data: action.data,
                error: {},
                status: ITEM_FETCH_SUCCESS
            });
        case ITEM_FETCH_ERROR:
            return Object.assign({}, state, {
                data: [],
                error: action.error,
                status: ITEM_FETCH_ERROR
            });
        default:
            return state;
    }
};