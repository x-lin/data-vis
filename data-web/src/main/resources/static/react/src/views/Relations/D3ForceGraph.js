import React from "react";
import { connect } from "react-redux";

import { getNeighbors } from "../../actions/aggregated/GETNeighbors";

import D3ForceGraphBehavior from "./D3ForceGraphBehavior";

const mapStateToProps = (state) => {
    return {
        graph: state.graph,
        settings: state.settings
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        searchNeighbors: (category, key, rerenderFlag) => {
            dispatch(getNeighbors(category, key, rerenderFlag));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(D3ForceGraphBehavior);