import React from "react";
import { connect } from "react-redux";

import { searchTestCoverage } from "../../actions/aggregated/SearchTestCoverage";
import { searchNeighbors } from "../../actions/aggregated/SearchNeighbors";
import TestCoverageTable from "./TestCoverageTable";

const mapStateToProps = (state) => {
    return {
        coverage: state.coverage,
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        searchTestCoverage: (type, key) => {
            dispatch(searchTestCoverage(type, key));
        },
        searchNeighborsStart: (category, key) => {
            dispatch(searchNeighbors(category, key));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(TestCoverageTable);