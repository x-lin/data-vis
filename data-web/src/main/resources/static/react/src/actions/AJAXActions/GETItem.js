import axios from "axios";

import { fetchSuccess, fetchError, fetchStart } from "../ItemActions/FetchActionCreators";


export const getItem = (category, key) => {
    return dispatch => {
        dispatch(fetchStart(category, key));
        return axios.get(`http://localhost:8080/search/issues/startLike/${key}`)
            .then(function (response) {
                //console.log("got some response")
                console.log(response);
                dispatch(fetchSuccess(category, key, response.data));
            })
            .catch(function (response) {
                //console.log("got some error")
                console.log(response);
                dispatch(fetchError(category, key, response.data));
            });
    };
};