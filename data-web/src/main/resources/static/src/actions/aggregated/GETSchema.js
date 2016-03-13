import axios from "axios";

import { fetchStart, fetchSuccess, fetchError } from "../action-creators/FetchSchemaCreators";
import Constants from "../../config/Constants";

export const getSchema = (key) => {
    return dispatch => {
        dispatch(fetchStart(key));

        return axios.get(`/search/projects/schema/${key}`)
            .then(function (response) {
                dispatch(fetchSuccess(key, response.data));
            })
            .catch(function (response) {
                dispatch(fetchError(key, response.data));
            });
    };
};