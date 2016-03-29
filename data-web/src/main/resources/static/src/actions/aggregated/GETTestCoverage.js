import axios from "axios";

import { fetchStart, fetchSuccess, fetchError } from "../action-creators/TestCoverageActions";
import { setTestCoverageVisibility } from "../action-creators/LayoutActions";
import Constants from "../../config/Constants";

export const getCoverage = (type, key, name) => {
    return dispatch => {
        dispatch(setTestCoverageVisibility(true));
        dispatch(fetchStart(key, name));

        return axios.get(`/search/${Constants.getEndpoint(type)}/coverage/${key}`)
            .then(function (response) {
                dispatch(fetchSuccess(key, response.data));
            })
            .catch(function (response) {
                dispatch(fetchError(key, response.data));
            });
    };
};