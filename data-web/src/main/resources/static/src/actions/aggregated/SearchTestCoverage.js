import { getCoverage } from "../aggregated/GETTestCoverage";


export const searchTestCoverage = (key) => {
    return (dispatch, getState) => {
        if(key) {
            return dispatch(getCoverage(key));
        } else {
            return dispatch(function(){});
        }
    }
};