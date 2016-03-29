import { getCoverage } from "../aggregated/GETTestCoverage";

export const searchTestCoverage = (type, key, name) => {
    return (dispatch, getState) => {
        if(key) {
            return dispatch(getCoverage(type, key, name));
        } else {
            return dispatch(function(){});
        }
    }
};