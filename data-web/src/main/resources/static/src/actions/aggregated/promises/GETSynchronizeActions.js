import axios from "axios";

import { fetchStart, fetchSuccess, fetchError } from "../../action-creators/SynchronizeActions";

export const synchronize = (nodes) => {
    return dispatch => {
        dispatch(fetchStart(nodes));

        const params = nodes.reduce((string, entry) => {
            return `${string}key=${entry.key}&`;
        }, "");

        return axios.get(`../search/generalNodes/synch?${params}`)
            .then((response) => {
                dispatch(fetchSuccess(response.data));
            })
            .catch((response) => {
                dispatch(fetchError(response.data));
            });
    };
};
