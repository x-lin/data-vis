import axios from "axios";

import { fetchSuccess, fetchError, fetchStart } from "../action-creators/FetchItemActions";
import Constants from "../../config/Constants";

export const getItem = (category, key) => {
    const endpoint = Constants.endpoints[category];
    return dispatch => {
        dispatch(fetchStart(category, key));

        return axios.get(`/search/${endpoint}/startLike/${key}?limit=10`)
            .then(function (response) {
                dispatch(fetchSuccess(category, key, response.data));
            })
            .catch(function (response) {
                dispatch(fetchError(category, key, response.data));
            });
    };
};