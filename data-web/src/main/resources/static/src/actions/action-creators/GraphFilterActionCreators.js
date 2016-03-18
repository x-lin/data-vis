export const FILTER_ITEM_CATEGORY = "FILTER_ITEM_CATEGORY";
export const UNFILTER_ITEM_CATEGORY = "UNFILTER_ITEM_CATEGORY";
export const SHOW_ALL_ITEM_CATEGORIES = "SHOW_ALL_ITEM_CATEGORIES";
export const TOGGLE_FILTER_ITEM_CATEGORY = "TOGGLE_FILTER_ITEM_CATEGORY";
export const INIT_GRAPH_FILTER = "INIT_GRAPH_FILTER";

export const FILTER_BY_PROPERTY = "";

export const toggleFilterItemCategory = (category) => {
    return {
        type: TOGGLE_FILTER_ITEM_CATEGORY,
        category
    }
};

export const filterItemCategory = (category) => {
    return {
        type: FILTER_ITEM_CATEGORY,
        category
    }
};

export const unfilterItemCategory = (category) => {
    return {
        type: UNFILTER_ITEM_CATEGORY,
        category
    }
};

export const showAllItemCategories = () => {
    return {
        type: SHOW_ALL_ITEM_CATEGORIES
    }
};

export const initGraphFilter = (data) => {
    return {
        type: INIT_GRAPH_FILTER,
        data
    }
}