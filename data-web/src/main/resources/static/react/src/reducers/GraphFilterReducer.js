import { ADD_TO_GRAPH, REMOVE_FROM_GRAPH, UPDATE_GRAPH, CLEAR_GRAPH }
    from "../actions/action-creators/GraphActionCreators";
import { NEIGHBORS_FETCH_START, NEIGHBORS_FETCH_SUCCESS, NEIGHBORS_FETCH_ERROR }
    from "../actions/action-creators/FetchNeighborsActionCreators";
import { TOGGLE_FILTER_ITEM_CATEGORY } from "../actions/action-creators/GraphFilterActionCreators";

import { indexOfObjectInArrayByProperty, indexOfObjectInArrayByProperties } from "../utils/SearchHelpers";
import Constants from "../config/Constants";
import { updateGraph } from "../actions/action-creators/GraphActionCreators";
import { store } from "../stores/ReduxStore";

export const graphFilterReducer = (state = Constants.defaultVisible, action) => {
    if(action.type === TOGGLE_FILTER_ITEM_CATEGORY) {
        if(state.hasOwnProperty(action.category)) {
            return(Object.assign({}, state, {
                [action.category]: !state[action.category]
            }));
        }
    }

    return state;
};