import { getNeighbors } from "./promises/GETNeighborsActions";
import { clearGraph } from "../action-creators/GraphActions";

import { ADD_TO_GRAPH_ON_SEARCH } from "../../config/Settings";
import { indexOfObjectInArrayByProperty } from "../../utils/SearchHelpers";

export const expandNeighbors = (category, key, params) => {
    return (dispatch) => {
        dispatch(getNeighbors(category, key, params));
    };
};

export const searchNeighbors = (category, key, params) => {
    return (dispatch, getState) => {
        if (key) {
            const { settings } = getState();
            const index = indexOfObjectInArrayByProperty(settings, ADD_TO_GRAPH_ON_SEARCH, "name");

            if (!settings[index].value) {
                dispatch(clearGraph());
            }

            dispatch(getNeighbors(category, key, params));
        } else {
            return dispatch(() => {});
        }
    };
};
