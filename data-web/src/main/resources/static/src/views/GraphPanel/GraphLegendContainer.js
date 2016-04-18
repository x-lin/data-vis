import React from "react";
import { connect } from "react-redux";

import { toggleFilterItemCategory } from "../../actions/action-creators/GraphFilterActions";

import GraphLegend from "./GraphLegend";

const mapStateToProps = (state) => {
    return {
        visibilityFilters: state.visibilityFilters,
        legend: state.graph.present
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        toggleFilterItemCategory: (category) => {
            dispatch(toggleFilterItemCategory(category));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(GraphLegend);