import React from "react";
import { connect } from "react-redux";

import { getNeighbors } from "../../actions/aggregated/GETNeighbors";

import ForceGraph from "./ForceGraph";

const mapStateToProps = (state) => {
    return {
        graph: state.graph,
        settings: state.settings
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