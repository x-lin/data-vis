import axios from "axios";

import { fetchStart, fetchSuccess, fetchError } from "../../action-creators/TestCoverageActions";
import { getEndpoint } from "../../../config/Defaults";

export const getTestCoverage = (node, index) => {
    return dispatch => {
        dispatch(fetchStart(node, index));

        return axios.get(`../search/${getEndpoint(node.type)}/coverage/${node.key}`)
            .then((response) => {
                dispatch(fetchSuccess(node.key, response.data, index));
            })
            .catch((response) => {
                dispatch(fetchError(node.key, response.data, index));
            });
    };
};
