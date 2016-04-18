import createAction from "./createAction";

export const TOGGLE_SETTING = "TOGGLE_SETTING";
export const SET_SETTING_VALUE = "SET_SETTING_VALUE";

export const toggleSetting = (name) => createAction(
    TOGGLE_SETTING,
    { name }
);

export const setSettingValue = (name, value) => createAction(
    SET_SETTING_VALUE,
    { name, value }
);
