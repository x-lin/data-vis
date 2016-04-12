import axios from "axios";

import { fetchNeighborsSingleError, fetchNeighborsSingleStart, fetchNeighborsSingleSuccess }
    from "../action-creators/SearchNeighborsSingleActions";
import Constants from "../../config/Constants";

export const getNeighborsSingle = (node) => {
    return (dispatch) => {
        dispatch(fetchNeighborsSingleStart(node));

        return axios.get(`/search/${Constants.getEndpoint(node.type)}/neighborsSingle/${node.key}`)
            .then(function (response) {
                dispatch(fetchNeighborsSingleSuccess(node, response.data));
            })
            .catch(function (response) {
                dispatch(fetchNeighborsSingleError(node, response.data));
            });
    };
};