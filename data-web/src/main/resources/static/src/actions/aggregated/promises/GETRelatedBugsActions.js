import axios from "axios";

import { fetchStart, fetchSuccess, fetchError } from "../../action-creators/RelatedBugsActions";
import { getEndpoint } from "../../../config/Defaults";

export const getRelatedBugs = (node, index) => {
    return dispatch => {
        dispatch(fetchStart(node, index));

        return axios.get(`../search/${getEndpoint(node.type)}/bugs/${node.key}`)
            .then((response) => {
                dispatch(fetchSuccess(node.key, response.data, index));
            })
            .catch((response) => {
                dispatch(fetchError(node.key, response.data, index));
            });
    };
};
