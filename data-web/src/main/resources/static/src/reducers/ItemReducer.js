import { ITEM_FETCH_START, ITEM_FETCH_SUCCESS, ITEM_FETCH_ERROR, ITEMS_CLEAR }
    from "../actions/action-creators/FetchActionCreators";
import { NEIGHBORS_FETCH_START }
    from "../actions/action-creators/FetchNeighborsActionCreators";
import { SET_SEARCH_CATEGORY, SET_SEARCH_SELECTED_INDEX, SET_SEARCH_INPUT_VALUE }
    from "../actions/action-creators/SearchBarActions";

import Constants from "../config/Constants";

export const itemReducer = (state = {
    data: [],
    error: {},
    selectedIndex: -1,
    categories: Constants.reversePropertyMap,
    category: Object.keys(Constants.reversePropertyMap)[0],
    value: ""
}, action) => {
    switch (action.type) {
        case SET_SEARCH_CATEGORY:
        case SET_SEARCH_SELECTED_INDEX:
        case SET_SEARCH_INPUT_VALUE:
            return searchBarReducer(state, action);

        case ITEM_FETCH_START:
        case ITEM_FETCH_SUCCESS:
        case ITEM_FETCH_ERROR:
            return fetchItemsReducer(state, action);

        case ITEMS_CLEAR:
            return Object.assign({}, state, {
                data: [],
                error: {},
                status: ITEMS_CLEAR
            });
        case NEIGHBORS_FETCH_START:
            return Object.assign({}, state, {
                data: [],
                error: {}
            });
        default:
            return state;
    }
};

const searchBarReducer = (state, action) => {
    switch (action.type) {
        case SET_SEARCH_CATEGORY:
            return Object.assign({}, state, {
                category: action.value
            });
        case SET_SEARCH_SELECTED_INDEX:
            return Object.assign({}, state, {
                selectedIndex: action.value
            });
        case SET_SEARCH_INPUT_VALUE:
            return Object.assign({}, state, {
                value: action.value
            });
        default:
            return state;
    }
};

const fetchItemsReducer = (state, action) => {
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
}