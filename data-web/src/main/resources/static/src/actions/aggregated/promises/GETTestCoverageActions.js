import axios from "axios";

import { fetchStart, fetchSuccess, fetchError } from "../../action-creators/TestCoverageActions";
import { getEndpoint } from "../../../config/Defaults";

export const getCoverage = (node) => {
    return dispatch => {
        dispatch(fetchStart(node.key, node.name));

        return axios.get(`/search/${getEndpoint(node.type)}/coverage/${node.key}`)
            .then((response) => {
                dispatch(fetchSuccess(node.key, response.data));
            })
            .catch((response) => {
                dispatch(fetchError(node.key, response.data));
            });
    };
};
