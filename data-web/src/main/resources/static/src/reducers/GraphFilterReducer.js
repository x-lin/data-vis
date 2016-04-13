import { ADD_TO_GRAPH, REMOVE_FROM_GRAPH, UPDATE_GRAPH, CLEAR_GRAPH }
    from "../actions/action-creators/GraphActions";
import { NEIGHBORS_FETCH_START, NEIGHBORS_FETCH_SUCCESS, NEIGHBORS_FETCH_ERROR }
    from "../actions/action-creators/FetchNeighborsActions";
import { TOGGLE_FILTER_ITEM_CATEGORY, INIT_GRAPH_FILTER } from "../actions/action-creators/GraphFilterActions";

import { indexOfObjectInArrayByProperty, indexOfObjectInArrayByProperties } from "../utils/SearchHelpers";
import Constants from "../config/Constants";
import { store } from "../stores/ReduxStore";

export const graphFilterReducer = (state = {}, action) => {
    switch(action.type) {
        case TOGGLE_FILTER_ITEM_CATEGORY:
            if(state.hasOwnProperty(action.category)) {
                return(Object.assign({}, state, {
                    [action.category]: !state[action.category]
                }));
            } else {
                return(Object.assign({}, state, {
                    [action.category]: false
                }));
            }
        case INIT_GRAPH_FILTER:
            return action.data.reduce((previous, currentVal) => {
                previous[currentVal.name] = true;
                return previous;
            }, {});
        default:
            return state;
    }
};