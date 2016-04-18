import { getCoverage } from "./promises/GETTestCoverageActions";
import { setTestCoverageVisibility } from "../action-creators/LayoutActions";

export const searchTestCoverage = (node) => {
    return (dispatch) => {
        if (node.key) {
            dispatch(setTestCoverageVisibility(true));
            return dispatch(getCoverage(node));
        } else {
            return dispatch(() => {});
        }
    };
};
