import React from "react";
import { connect } from "react-redux";

import { searchNeighbors } from "../../actions/aggregated/SearchNeighborsActions";
import { setVisibility } from "../../actions/action-creators/LayoutActions";
import TestCoverageTable from "./TestCoverageTable";

const mapStateToProps = (state) => {
    return {
        coverage: state.coverage
    };
};

const mapDispatchProps = (dispatch) => {
    return {
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