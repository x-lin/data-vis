import axios from "axios";

import { fetchNeighborsSuccess, fetchNeighborsError, fetchNeighborsStart } from "../action-creators/FetchNeighborsActionCreators";
import Constants from "../../config/Constants";

export const getNeighbors = (category, key) => {
    const endpoint = Constants.endpoints[category];
    return (dispatch, getState) => {
        const lanes = getState().lanes;
        let excluded = null;
        let priority = null;
        //TODO add downstream/upstream option
        //TODO add limit option

        lanes.forEach((lane) => {
            if(lane.key === "PRIORITIZED") {
                priority = lane.notes.map(note => {
                    return "priority=" + note.key + "&";
                })
            } else if(lane.key === "EXCLUDED") {
                excluded = lane.notes.map(note => {
                    return "excluded=" + note.key + "&";
                })
            }
        });

        dispatch(fetchNeighborsStart(category, key));

        return axios.get(`/search/${endpoint}/neighbors/${key}?${excluded ? excluded : ""}&${priority ? priority : ""}&limit=20`)
            .then(function (response) {
                dispatch(fetchNeighborsSuccess(category, key, response.data));
            })
            .catch(function (response) {
                dispatch(fetchNeighborsError(category, key, response.data));
            });
    };
};