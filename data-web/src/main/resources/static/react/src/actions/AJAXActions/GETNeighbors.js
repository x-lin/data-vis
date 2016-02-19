import axios from "axios";

import { fetchNeighborsSuccess, fetchNeighborsError, fetchNeighborsStart } from "../ItemActions/FetchNeighborsActionCreators";
import { endpoints } from "../../config/Constants";

export const getNeighbors = (category, key) => {
    const endpoint = endpoints[category];

    return dispatch => {
        dispatch(fetchNeighborsStart(category, key));
        return axios.get(`http://localhost:8080/search/${endpoint}/neighbors/${key}`)
            .then(function (response) {
                dispatch(fetchNeighborsSuccess(category, key, response.data));
            })
            .catch(function (response) {
                dispatch(fetchNeighborsError(category, key, response.data));
            });
    };
};