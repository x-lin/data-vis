import React from "react";
import { connect } from "react-redux";

import { setFilterValue } from "../../actions/action-creators/LaneActions";

import NeighborExpansion from "./NeighborExpansion";

const mapStateToProps = (state) => {
    return {
        limit: state.lanes.filters.limit
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        setFilterValue: (name, value) => {
            dispatch(setFilterValue(name, value));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(NeighborExpansion);