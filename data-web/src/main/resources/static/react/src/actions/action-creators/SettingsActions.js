export const TOGGLE_SETTING = "TOGGLE_SETTING";

export const ADD_TO_GRAPH_ON_SEARCH = "RENDER_NEW_GRAPH_ON_SEARCH";

export const toggleSetting = (name) => {
    return {
        type: TOGGLE_SETTING,
        name: name
    }
};