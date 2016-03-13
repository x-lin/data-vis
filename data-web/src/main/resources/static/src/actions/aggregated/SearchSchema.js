import { getSchema } from "../aggregated/GETSchema";
import { clearGraph } from "../../actions/action-creators/GraphActionCreators";

import { ADD_TO_GRAPH_ON_SEARCH } from "../../config/Settings";
import { indexOfObjectInArrayByProperty } from "../../utils/SearchHelpers";

export const searchSchema = (key) => {
    return (dispatch, getState) => {
        if(key) {
            //const { settings } = getState();
            //const index = indexOfObjectInArrayByProperty(settings, ADD_TO_GRAPH_ON_SEARCH, "name");
            //
            //if(!settings[index].value) {
            //    dispatch(clearGraph());
            //}

            return dispatch(getSchema(key));
        } else {
            return dispatch(function(){});
        }
    }
};