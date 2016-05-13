import axios from "axios";

import { fetchStart, fetchSuccess, fetchError } from "../../action-creators/QueryBuilderActions";
import { getEndpoint } from "../../../config/Defaults";

export const postQueryBuilder = (data, index) => {
    return dispatch => {
        dispatch(fetchStart(data, index));

        return axios.post(`../search/${getEndpoint(data.source.type)}/builder`, data)
            .then((response) => {
                dispatch(fetchSuccess(response.data, index));
            })
            .catch((response) => {
                dispatch(fetchError(response.data, index));
            });
    };
};
