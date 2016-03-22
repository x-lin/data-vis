import axios from "axios";

import { fetchStart, fetchSuccess, fetchError } from "../action-creators/TestCoverageActions";
import Constants from "../../config/Constants";

export const getCoverage = (type, key) => {
    return dispatch => {
        dispatch(fetchStart(key));

        console.log("fetching things");

        return axios.get(`/search/${Constants.getEndpoint(type)}/coverage/${key}`)
            .then(function (response) {
                dispatch(fetchSuccess(key, response.data));
            })
            .catch(function (response) {
                dispatch(fetchError(key, response.data));
            });
    };
};