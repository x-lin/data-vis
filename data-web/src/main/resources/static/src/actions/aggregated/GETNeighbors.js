import axios from "axios";

import { fetchNeighborsSuccess, fetchNeighborsError, fetchNeighborsStart } from "../action-creators/FetchNeighborsActionCreators";
import Constants from "../../config/Constants";

export const getNeighbors = (category, key) => {
    const endpoint = Constants.endpoints[category];
    return dispatch => {
        dispatch(fetchNeighborsStart(category, key));

        return axios.get(`/search/${endpoint}/neighbors/${key}`)
            .then(function (response) {
                dispatch(fetchNeighborsSuccess(category, key, response.data));
            })
            .catch(function (response) {
                dispatch(fetchNeighborsError(category, key, response.data));
            });
    };
};