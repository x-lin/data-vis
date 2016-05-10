import axios from "axios";

import { fetchNeighborTypesStart, fetchNeighborTypesError, fetchNeighborTypesSuccess }
    from "../../action-creators/SearchNeighborTypesActions";
import { getEndpoint } from "../../../config/Defaults";

export const getNeighborTypes = (node) => {
    return (dispatch) => {
        dispatch(fetchNeighborTypesStart(node));

        return axios.get(`../search/${getEndpoint(node.type)}/neighborTypes/${node.key}`)
            .then((response) => {
                dispatch(fetchNeighborTypesSuccess(response.data));
            })
            .catch((response) => {
                dispatch(fetchNeighborTypesError(response.data));
            });
    };
};
