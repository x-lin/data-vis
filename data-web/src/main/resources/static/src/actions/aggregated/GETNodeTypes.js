import axios from "axios";

import { fetchNodeTypeStart, fetchNodeTypeError, fetchNodeTypeSuccess } from "../action-creators/FetchNodeTypeActionCreators";
import { initLane } from "../action-creators/LaneActions";
import { initGraphFilter } from "../action-creators/GraphFilterActionCreators";
import Constants from "../../config/Constants";

export const getNodeTypes = () => {
    return (dispatch, getState) => {
        dispatch(fetchNodeTypeStart());

        return axios.get(`/search/nodeTypes`)
            .then(function (response) {
                dispatch(fetchNodeTypeSuccess(response.data));
                dispatch(initLane(response.data));
                dispatch(initGraphFilter(response.data));
            })
            .catch(function (response) {
                dispatch(fetchNodeTypeError(response.data));
            });
    };
};