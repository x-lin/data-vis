import { connect } from "react-redux";

import { getItem } from "../../actions/aggregated/promises/GETItemActions";
import { searchNeighbors } from "../../actions/aggregated/SearchNeighborsActions";
import { clearItems } from "../../actions/action-creators/FetchItemActions";
import { setSearchCategory, setSearchInputValue, setSearchSelectedIndex }
    from "../../actions/action-creators/SearchBarActions";

import SearchBar from "./SearchBar";

const mapStateToProps = (state) => {
    return {
        data: state.items.data,
        selectedIndex: state.items.selectedIndex,
        type: state.items.type,
        value: state.items.value,
        categories: state.items.categories,
        searchKey: state.items.searchKey,
        searchType: state.items.searchType
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        searchNeighborsStart: (category, key) => {
            dispatch(searchNeighbors(category, key));
        },
        searchItem: (category, key, startAt) => {
            dispatch(getItem(category, key, startAt));
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
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(SearchBar);
