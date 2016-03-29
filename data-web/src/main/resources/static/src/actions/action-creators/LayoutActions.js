export const SET_SIDEBAR_PANEL = "SET_SIDEBAR_PANEL";

export const setTestCoverageVisibility = (visible) => {
    return {
        type: SET_SIDEBAR_PANEL,
        key: "test",
        visible
    }
};