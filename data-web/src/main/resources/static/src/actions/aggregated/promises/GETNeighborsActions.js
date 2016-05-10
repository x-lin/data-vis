import axios from "axios";

import { fetchNeighborsSuccess, fetchNeighborsError, fetchNeighborsStart }
    from "../../action-creators/SearchNeighborsActions";
import { getEndpoint } from "../../../config/Defaults";
import { buildHttpParams } from "../../../utils/buildHttpParams";
import { buildParamsFromState } from "../buildParamsFromState";

export const getNeighbors = (category, key, params) => {
    return (dispatch, getState) => {
        const paramsObj = params || buildParamsFromState(getState());
        const paramsString = buildHttpParams(paramsObj);

        dispatch(fetchNeighborsStart(category, key));

        return axios.get(`../search/${getEndpoint(category)}/neighbors/${key}?${paramsString}`)
            .then((response) => {
                dispatch(fetchNeighborsSuccess(category, key, response.data));
            })
            .catch((response) => {
                dispatch(fetchNeighborsError(category, key, response.data));
            });
    };
};
