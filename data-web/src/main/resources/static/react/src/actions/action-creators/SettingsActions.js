export const TOGGLE_SETTING = "TOGGLE_SETTING";

export const toggleSetting = (name) => {
    return {
        type: TOGGLE_SETTING,
        name: name
    }
};