import createAction from "./createAction";

export const SET_SIDEBAR_PANEL = "SET_SIDEBAR_PANEL";
export const ADD_SIDEBAR_REACT_COMPONENT = "ADD_SIDEBAR_REACT_COMPONENT";
export const DELETE_BOX_FROM_SIDEBAR = "DELETE_BOX_FROM_SIDEBAR";
export const TOGGLE_BOX_FROM_SIDEBAR = "TOGGLE_BOX_FROM_SIDEBAR";

export const setTestCoverageVisibility = (visible) => createAction(
    SET_SIDEBAR_PANEL,
    { key: "test", visible }
);

export const setVisibility = (visible) => createAction(
    SET_SIDEBAR_PANEL,
    { visible }
);

export const deleteBox = (id) => createAction(
    DELETE_BOX_FROM_SIDEBAR,
    { id }
);

export const toggleBox = (id) => createAction(
    TOGGLE_BOX_FROM_SIDEBAR,
    { id }
);
