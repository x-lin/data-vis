import axios from "axios";

import { fetchNeighborsSingleError, fetchNeighborsSingleStart, fetchNeighborsSingleSuccess }
    from "../../action-creators/SearchNeighborsSingleActions";
import { getEndpoint } from "../../../config/Defaults";

export const getNeighborsSingle = (node) => {
    return (dispatch) => {
        dispatch(fetchNeighborsSingleStart(node));

        return axios.get(`/search/${getEndpoint(node.type)}/neighborsSingle/${node.key}`)
            .then((response) => {
                dispatch(fetchNeighborsSingleSuccess(node, response.data));
            })
            .catch((response) => {
                dispatch(fetchNeighborsSingleError(node, response.data));
            });
    };
};
