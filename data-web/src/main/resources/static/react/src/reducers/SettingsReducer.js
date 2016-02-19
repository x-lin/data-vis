import { TOGGLE_SETTING, RENDER_NEW_GRAPH_ON_SEARCH }
    from "../actions/UserActions/SettingsActions";

import Settings from "../config/Settings";
import { indexOfObjectInArrayByProperty } from "../utils/SearchHelpers";

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
    console.log("toggling", newVal);
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