import createAction from "./createAction";

export const SET_SEARCH_CATEGORY = "SET_SEARCH_CATEGORY";
export const SET_SEARCH_INPUT_VALUE = "SET_SEARCH_INPUT_VALUE";
export const SET_SEARCH_SELECTED_INDEX = "SET_SEARCH_SELECTED_INDEX";

export const setSearchCategory = (value) => createAction(
    SET_SEARCH_CATEGORY,
    { value }
);

export const setSearchInputValue= (value) => createAction(
    SET_SEARCH_INPUT_VALUE,
    { value }
);

export const setSearchSelectedIndex= (selectedIndex) => createAction(
    SET_SEARCH_SELECTED_INDEX,
    { value: selectedIndex }
);