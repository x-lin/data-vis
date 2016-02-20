import React from "react";
import { connect } from "react-redux";

import { getItem } from "../../actions/aggregated/GETItem";
import { searchNeighbors } from "../../actions/aggregated/SearchNeighbors";
import { clearItems } from "../../actions/action-creators/FetchActionCreators";
import { setSearchCategory, setSearchInputValue, setSearchSelectedIndex}
    from "../../actions/action-creators/SearchBarActions";

import SearchBar from "./SearchBar";

const mapStateToProps = (state) => {
    return {
        items: state.items.data,
        selectedIndex: state.items.selectedIndex,
        category: state.items.category,
        value: state.items.value,
        categories: state.items.categories
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
        },
        setSearchCategory: (value) => {
            dispatch(setSearchCategory(value));
        },
        setSearchInputValue: (value) => {
            dispatch(setSearchInputValue(value));
        },
        setSearchSelectedIndex: (value) => {
            dispatch(setSearchSelectedIndex(value));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(SearchBar);