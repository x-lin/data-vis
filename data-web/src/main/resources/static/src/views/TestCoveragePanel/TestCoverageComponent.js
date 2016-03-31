import React from "react";
import { connect } from "react-redux";

import { searchTestCoverage } from "../../actions/aggregated/SearchTestCoverage";
import { searchNeighbors } from "../../actions/aggregated/SearchNeighbors";
import { setVisibility } from "../../actions/action-creators/LayoutActions";
import TestCoverageTable from "./TestCoverageTable";

const mapStateToProps = (state) => {
    return {
        coverage: state.coverage
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        searchTestCoverage: (type, key) => {
            dispatch(searchTestCoverage(type, key));
        },
        searchNeighborsStart: (category, key) => {
            dispatch(searchNeighbors(category, key));
        },
        setPanelInvisible: () => {
            dispatch(setVisibility(false));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(TestCoverageTable);