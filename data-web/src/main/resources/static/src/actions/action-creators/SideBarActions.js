import createAction from "./createAction";

export const SET_SIDEBAR_PANEL = "SET_SIDEBAR_PANEL";
export const ADD_SIDEBAR_REACT_COMPONENT = "ADD_SIDEBAR_REACT_COMPONENT";
export const DELETE_BOX_FROM_SIDEBAR = "DELETE_BOX_FROM_SIDEBAR";

export const setTestCoverageVisibility = (visible) => createAction(
    SET_SIDEBAR_PANEL,
    { key: "test", visible }
);

export const setVisibility = (visible) => createAction(
    SET_SIDEBAR_PANEL,
    { visible }
);

export const addReactComponent = (index, object) => createAction(
    ADD_SIDEBAR_REACT_COMPONENT,
    { index, object }
);

export const deleteBox = (id) => createAction(
    DELETE_BOX_FROM_SIDEBAR,
    { id }
)
