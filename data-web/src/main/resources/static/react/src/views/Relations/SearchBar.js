import React from "react";
import { connect } from "react-redux";

import { getItem } from "../../actions/aggregated/GETItem";
import { getNeighbors } from "../../actions/aggregated/GETNeighbors";
import { searchNeighbors } from "../../actions/aggregated/SearchNeighbors";
import { clearItems } from "../../actions/action-creators/FetchActionCreators";
import { updateGraph } from "../../actions/action-creators/GraphActionCreators";

import SearchBarBehavior from "./SearchBarBehavior";

const mapStateToProps = (state) => {
    return {
        items: state.items.data
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        searchNeighborsStart: (category, key) => {
            dispatch(searchNeighbors(category, key));
        },
        searchItem: (category, key) => {
            dispatch(getItem(category, key));
        },
        clearAllItems: () => {
            dispatch(clearItems());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(SearchBarBehavior);