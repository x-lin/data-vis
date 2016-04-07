import axios from "axios";

import { fetchNeighborTypesStart, fetchNeighborTypesError, fetchNeighborTypesSuccess }
    from "../action-creators/SearchNeighborTypesActions";
import Constants from "../../config/Constants";

export const getNeighborTypes = (node) => {
    return (dispatch) => {
        dispatch(fetchNeighborTypesStart(node));

        return axios.get(`/search/${Constants.getEndpoint(node.type)}/neighborTypes/${node.key}`)
            .then(function (response) {
                dispatch(fetchNeighborTypesSuccess(response.data));
            })
            .catch(function (response) {
                dispatch(fetchNeighborTypesError(response.data));
            });
    };
};