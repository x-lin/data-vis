export const SET_SEARCH_CATEGORY = "SET_SEARCH_CATEGORY";
export const SET_SEARCH_INPUT_VALUE = "SET_SEARCH_INPUT_VALUE";
export const SET_SEARCH_SELECTED_INDEX = "SET_SEARCH_SELECTED_INDEX";

export const setSearchCategory = (category) => {
    return {
        type: SET_SEARCH_CATEGORY,
        value: category
    }
};

export const setSearchInputValue= (value) => {
    return {
        type: SET_SEARCH_INPUT_VALUE,
        value
    }
};

export const setSearchSelectedIndex= (selectedIndex) => {
    return {
        type: SET_SEARCH_SELECTED_INDEX,
        value: selectedIndex
    }
};