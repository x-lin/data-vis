import axios from "axios";

import { fetchNeighborsSuccess, fetchNeighborsError, fetchNeighborsStart } from "../action-creators/FetchNeighborsActionCreators";
import Constants from "../../config/Constants";
import { PRIORITIZED, EXCLUDED } from "../../reducers/LaneReducer";

export const getNeighbors = (category, key) => {
    const endpoint = Constants.endpoints[category];
    return (dispatch, getState) => {
        const lanes = getState().lanes.lanes;
        const filters = getState().lanes.filters;

        let excluded = null;
        let priority = null;
        //TODO add downstream/upstream option
        //TODO add limit option

        lanes.forEach((lane) => {
            if(lane.key === PRIORITIZED) {
                priority = lane.notes.reduce((prevVal, currentVal) => {
                    return prevVal + "priority=" + currentVal.key + "&";
                }, "")
            } else if(lane.key === EXCLUDED) {
                excluded = lane.notes.reduce((prevVal, currentVal) => {
                    return prevVal + "excluded=" + currentVal.key + "&";
                }, "")
            }
        });

        console.log(filters);

        const upstream = filters.upstream === false ? "upstream=false" : "";
        const downstream = filters.downstream === false ? "downstream=false" : "";
        const limit = "limit=" + filters.limit;

        //excluded += "excluded=SET&excluded=FLD";

        dispatch(fetchNeighborsStart(category, key));

        return axios.get(`/search/${endpoint}/neighbors/${key}?${excluded ? excluded : ""}&${priority ? priority : ""}&${upstream}&${downstream}&${limit}`)
            .then(function (response) {
                dispatch(fetchNeighborsSuccess(category, key, response.data));
            })
            .catch(function (response) {
                dispatch(fetchNeighborsError(category, key, response.data));
            });
    };
};