import React from "react";
import { connect } from "react-redux";

import { getNeighbors } from "../../actions/aggregated/GETNeighbors";
import { clearGraph, updateGraph } from "../../actions/action-creators/GraphActionCreators";

import ForceGraph from "./ForceGraph";

const mapStateToProps = (state) => {
    return {
        graph: state.graph,
        visibilityFilters: state.visibilityFilters
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        searchNeighbors: (category, key) => {
            dispatch(getNeighbors(category, key));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(ForceGraph);