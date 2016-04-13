import createAction from "./createAction";

export const FILTER_ITEM_CATEGORY = "FILTER_ITEM_CATEGORY";
export const UNFILTER_ITEM_CATEGORY = "UNFILTER_ITEM_CATEGORY";
export const SHOW_ALL_ITEM_CATEGORIES = "SHOW_ALL_ITEM_CATEGORIES";
export const TOGGLE_FILTER_ITEM_CATEGORY = "TOGGLE_FILTER_ITEM_CATEGORY";
export const INIT_GRAPH_FILTER = "INIT_GRAPH_FILTER";

export const toggleFilterItemCategory = (category) => createAction(
    TOGGLE_FILTER_ITEM_CATEGORY,
    { category }
);

export const filterItemCategory = (category) => createAction(
    FILTER_ITEM_CATEGORY,
    { category }
);

export const unfilterItemCategory = (category) => createAction(
    UNFILTER_ITEM_CATEGORY,
    { category }
);

export const showAllItemCategories = () => createAction(
    SHOW_ALL_ITEM_CATEGORIES
);

export const initGraphFilter = (data) => createAction(
    INIT_GRAPH_FILTER,
    data
);