import axios from "axios";

import { fetchSuccess, fetchError, fetchStart } from "../../action-creators/FetchItemActions";
import { getEndpoint } from "../../../config/Defaults";

export const getItem = (category, key, startAt) => {
    const endpoint = getEndpoint(category);
    return dispatch => {
        dispatch(fetchStart(category, key));

        return axios.get(`../search/${endpoint}/startLike/${key}?limit=10&startAt=${startAt ? startAt : ""}`)
            .then((response) => {
                dispatch(fetchSuccess(category, key, response.data));
            })
            .catch((response) => {
                dispatch(fetchError(category, key, response.data));
            });
    };
};
