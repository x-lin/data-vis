import axios from "axios";

import { fetchNeighborsSuccess, fetchNeighborsError, fetchNeighborsStart } from "../ItemActions/FetchNeighborsActionCreators";

export const getNeighbors = (category, key) => {
    return dispatch => {
        dispatch(fetchNeighborsStart(category, key));
        //console.log("starting")
        return axios.get(`http://localhost:8080/search/issues/neighbors/${key}`)
            .then(function (response) {
                console.log(response);
                dispatch(fetchNeighborsSuccess(category, key, response.data));
            })
            .catch(function (response) {
                console.log(response);
                dispatch(fetchNeighborsError(category, key, response.data));
            });
    };
};