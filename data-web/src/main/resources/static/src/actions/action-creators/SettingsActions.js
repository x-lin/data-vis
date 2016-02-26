export const TOGGLE_SETTING = "TOGGLE_SETTING";
export const SET_SETTING_VALUE = "SET_SETTING_VALUE";

export const toggleSetting = (name) => {
    return {
        type: TOGGLE_SETTING,
        name: name
    }
};

export const setSettingValue = (name, value) => {
    return {
        type: SET_SETTING_VALUE,
        name,
        value
    }
};