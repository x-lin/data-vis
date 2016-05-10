import axios from "axios";

import { fetchNodeTypeStart, fetchNodeTypeError, fetchNodeTypeSuccess }
    from "../../action-creators/FetchNodeTypeActions";

export const getNodeTypes = () => {
    return (dispatch) => {
        dispatch(fetchNodeTypeStart());

        return axios.get("../search/nodeTypes")
            .then((response) => {
                dispatch(fetchNodeTypeSuccess(response.data));
            })
            .catch((response) => {
                dispatch(fetchNodeTypeError(response.data));
            });
    };
};
