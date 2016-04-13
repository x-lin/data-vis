import createAction from "./createAction";

export const SET_SIDEBAR_PANEL = "SET_SIDEBAR_PANEL";

export const setTestCoverageVisibility = (visible) => createAction(
    SET_SIDEBAR_PANEL,
    { key: "test", visible }
);

export const setVisibility = (visible) => createAction(
    SET_SIDEBAR_PANEL,
    { visible }
);