import axios from "axios";

import { fetchNeighborsSuccess, fetchNeighborsError, fetchNeighborsStart } from "../action-creators/FetchNeighborsActions";
import Constants from "../../config/Constants";
import { PRIORITIZED, EXCLUDED } from "../../reducers/laneReducer";

export const getNeighbors = (category, key, paramsString) => {
    const endpoint = Constants.getEndpoint(category);
    return (dispatch, getState) => {
        let params = null;

        if(!paramsString) {
            const lanes = getState().lanes.lanes;
            const filters = getState().lanes.filters;

            let excluded = null;
            let priority = null;

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

            const upstream = filters.upstream === false ? "upstream=false" : "";
            const downstream = filters.downstream === false ? "downstream=false" : "";
            const limit = "limit=" + filters.limit;
            params = `${excluded ? excluded : ""}&${priority ? priority : ""}&${upstream}&${downstream}&${limit}`;
        } else {
            params = paramsString;
        }

        dispatch(fetchNeighborsStart(category, key));

        return axios.get(`/search/${endpoint}/neighbors/${key}?${params}`)
            .then(function (response) {
                dispatch(fetchNeighborsSuccess(category, key, response.data));
            })
            .catch(function (response) {
                dispatch(fetchNeighborsError(category, key, response.data));
            });
    };
}