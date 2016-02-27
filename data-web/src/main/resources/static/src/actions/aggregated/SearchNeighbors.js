import { getNeighbors } from "../aggregated/GETNeighbors";
import { clearGraph } from "../../actions/action-creators/GraphActionCreators";

import { ADD_TO_GRAPH_ON_SEARCH } from "../../config/Settings";
import { indexOfObjectInArrayByProperty } from "../../utils/SearchHelpers";

export const searchNeighbors = (category, key) => {
    return (dispatch, getState) => {
        const { settings } = getState();
        const index = indexOfObjectInArrayByProperty(settings, ADD_TO_GRAPH_ON_SEARCH, "name");

        if(!settings[index].value) {
            dispatch(clearGraph());
        }

        return dispatch(getNeighbors(category, key));
    }
};