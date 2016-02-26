import React from "react";
import { connect } from "react-redux";

import { getNeighbors } from "../../actions/aggregated/GETNeighbors";
import { clearGraph, updateGraph } from "../../actions/action-creators/GraphActionCreators";
import { DISABLED_OPACITY_VALUE, SET_NODE_POSITIONS_FIXED, SHOW_CONTEXT_MENU, DISABLE_SELECTION_OF_FILTERED_NODES }
    from "../../config/Settings";

import ForceGraph from "./ForceGraph";

const mapStateToProps = (state) => {
    const settings = (() => {
        const s = {};

        for(let i = 0; i < state.settings.length; i++) {
            s[state.settings[i].name] = state.settings[i].value;
        }

        return s;
    })();

    return {
        graph: state.graph,
        visibilityFilters: state.visibilityFilters,
        disabledOpacity: settings[DISABLED_OPACITY_VALUE],
        isFixed: settings[SET_NODE_POSITIONS_FIXED],
        showContextMenu: settings[SHOW_CONTEXT_MENU],
        disableFiltered: settings[DISABLE_SELECTION_OF_FILTERED_NODES]
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