import { combineReducers } from "redux";

import itemReducer from "./itemReducer";
import neighborsReducer from "./neighborsReducer";
import graphReducer from "./graphReducer";
import settingsReducer from "./settingsReducer";
import graphFilterReducer from "./graphFilterReducer";
import laneReducer from "./laneReducer";
import nodeTypeReducer from "./nodeTypeReducer";
import contextMenuReducer from "./contextMenuReducer";
import sidebarReducer from "./sidebarReducer";
import queryBuilderReducer from "./queryBuilderReducer";

export default combineReducers({
    settings: settingsReducer,
    items: itemReducer,
    neighbors: neighborsReducer,
    graph: graphReducer,
    visibilityFilters: graphFilterReducer,
    lanes: laneReducer,
    nodeTypes: nodeTypeReducer,
    contextmenu: contextMenuReducer,
    sidebar: sidebarReducer,
    builder: queryBuilderReducer
});
