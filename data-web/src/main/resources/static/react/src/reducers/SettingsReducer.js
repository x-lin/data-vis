import { TOGGLE_SETTING, ADD_TO_GRAPH_ON_SEARCH }
    from "../actions/action-creators/SettingsActions";

import Settings from "../config/Settings";
import { indexOfObjectInArrayByProperty } from "../utils/SearchHelpers";

import { SEARCH_NEIGHBORS_START } from "../actions/action-creators/SearchActions";

export const settingsReducer = (state = Settings, action) => {
    switch (action.type) {
        case TOGGLE_SETTING:
            return toggleSetting(state, action);
        default:
            return state;
    }
};

const toggleSetting = (state, action) => {
    const index =  indexOfObjectInArrayByProperty(state, action.name, "name");
    const newVal = Object.assign(state[index]);
    newVal.value= !newVal.value;

    if(index !== -1) {
        return [
            ...state.slice(0, index),
            newVal,
            ...state.slice(index + 1)
        ];
    } else {
        return state;
    }
};