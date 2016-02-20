import axios from "axios";

import { fetchNeighborsSuccess, fetchNeighborsError, fetchNeighborsStart } from "../action-creators/FetchNeighborsActionCreators";
import { setRerenderFlag } from "../action-creators/GraphActionCreators";
import Constants from "../../config/Constants";

let index = 0;

export const getNeighbors = (category, key, rerender) => {
    const endpoint = Constants.endpoints[category];
    return dispatch => {
        index++;
        dispatch(fetchNeighborsStart(category, key, index));

        return axios.get(`http://localhost:8080/search/${endpoint}/neighbors/${key}`)
            .then(function (response) {
                dispatch(fetchNeighborsSuccess(category, key, response.data, rerender, index));
            })
            .catch(function (response) {
                dispatch(fetchNeighborsError(category, key, response.data, index));
            });
    };
};