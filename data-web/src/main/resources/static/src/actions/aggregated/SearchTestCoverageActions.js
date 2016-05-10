import { getTestCoverage } from "./promises/GETTestCoverageActions";
import { getRelatedBugs } from "./promises/GETRelatedBugsActions";
import { setTestCoverageVisibility } from "../action-creators/SidebarActions";
import { postQueryBuilder } from "./promises/POSTQueryBuilderActions";

let i = 0;

export const searchTestCoverage = (node) => {
    const index = i++;

    return (dispatch) => {
        if (node.key) {
            dispatch(setTestCoverageVisibility(true));
            return dispatch(getTestCoverage(node, index));
        } else {
            return dispatch(() => {});
        }
    };
};

export const searchRelatedBugs = (node) => {
    const index = i++;

    return (dispatch) => {
        if (node.key) {
            dispatch(setTestCoverageVisibility(true));
            return dispatch(getRelatedBugs(node, index));
        } else {
            return dispatch(() => {});
        }
    };
};

export const searchByQueryBuilder = (data) => {
    const index = i++;

    return (dispatch) => {
        if (data.source.key) {
            dispatch(setTestCoverageVisibility(true));
            return dispatch(postQueryBuilder(data, index));
        } else {
            return dispatch(() => {});
        }
    };
};