import { SET_SIDEBAR_PANEL } from "../actions/action-creators/LayoutActions";
import Constants from "../config/Constants";

export default (
    state = {
        sidebar : {
            object: null,
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
        default:
            return state;
    }
};

const setSidebarVisibility = (state, action) => {
    if(state.sidebar.visible !== action.visible) {
        const newSidebar = Object.assign({}, state.sidebar, {
            visible: action.visible
        });

        return Object.assign({}, state, {
            sidebar: newSidebar
        })
    } else {
        return state;
    }
};

const setSidebarObject = (state, action) => {
    if(action.key && state.sidebar.key !== action.key) {
        let panelObject = null;
        const panels = state.sidebar.sidePanels;

        for(let i = 0; i < panels.length; i++) {
            if(panels[i].key === action.key) {
                panelObject = panels[i].object;
                break;
            }
        }

        const newSidebar = Object.assign({}, state.sidebar, {
            key: action.key,
            object: panelObject
        });

        return Object.assign({}, state, {
            sidebar: newSidebar
        })
    } else {
        return state;
    }
};