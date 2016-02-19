import axios from "axios";

import { fetchSuccess, fetchError, fetchStart } from "../ItemActions/FetchActionCreators";
import { endpoints } from "../../config/Constants";

export const getItem = (category, key) => {
    const endpoint = endpoints[category];
    return dispatch => {
        dispatch(fetchStart(category, key));
        return axios.get(`http://localhost:8080/search/${endpoint}/startLike/${key}?limit=10`)
            .then(function (response) {
                console.log(response);
                dispatch(fetchSuccess(category, key, response.data));
            })
            .catch(function (response) {
                dispatch(fetchError(category, key, response.data));
            });
    };
};