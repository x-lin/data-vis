import { getCoverage } from "../aggregated/GETTestCoverage";

export const searchTestCoverage = (type, key) => {
    return (dispatch, getState) => {
        if(key) {
            return dispatch(getCoverage(type, key));
        } else {
            return dispatch(function(){});
        }
    }
};