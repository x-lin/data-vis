import { REHYDRATE } from "redux-persist/constants";

import { SET_SIDEBAR_PANEL } from "../actions/action-creators/LayoutActions";
import Constants from "../config/Constants";

const setSidebarVisibility = (state, action) => {
    if (state.sidebar.visible !== action.visible) {
        const newSidebar = Object.assign({}, state.sidebar, {
            visible: action.visible
        });

        return Object.assign({}, state, {
            sidebar: newSidebar
        });
    } else {
        return state;
    }
};

const setSidebarObject = (state, action) => {
    if (action.key && state.sidebar.key !== action.key) {
        let panelObject = null;
        const panels = state.sidebar.sidePanels;

        for (let i = 0; i < panels.length; i++) {
            if (panels[i].key === action.key) {
                panelObject = panels[i].obj;
                break;
            }
        }

        const newSidebar = Object.assign({}, state.sidebar, {
            key: action.key,
            obj: panelObject
        });

        return Object.assign({}, state, {
            sidebar: newSidebar
        });
    } else {
        return state;
    }
};

export default (
    state = {
        sidebar: {
            obj: null,
            visible: false,
            key: null,
            sidePanels: Constants.sidePanels
        }
    }, action
) => {
    switch (action.type) {
        case SET_SIDEBAR_PANEL:
            state = setSidebarVisibility(state, action);
            state = setSidebarObject(state, action);

            return state;
        case REHYDRATE:
            state.sidebar.sidePanels.forEach((sidePanel) => {
                if (action.payload.layout && action.payload.layout.sidebar.key === sidePanel.key) {
                    state.sidebar = Object.assign({}, state.sidebar, {
                        obj: sidePanel.obj,
                        key: sidePanel.key,
                        visible: action.payload.layout.sidebar.visible
                    });
                }
            });

            return Object.assign({}, state, {
                sidebar: state.sidebar
            });
        default:
            return state;
    }
};
