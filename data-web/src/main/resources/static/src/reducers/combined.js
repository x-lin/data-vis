import { combineReducers } from "redux";

import itemReducer from "../reducers/itemReducer";
import neighborsReducer from "../reducers/neighborsReducer";
import graphReducer from "../reducers/graphReducer";
import settingsReducer from "../reducers/settingsReducer";
import graphFilterReducer from "../reducers/graphFilterReducer";
import laneReducer from "../reducers/laneReducer";
import testCoverageReducer from "../reducers/testCoverageReducer";
import nodeTypeReducer from "../reducers/nodeTypeReducer";
import layoutReducer from "../reducers/layoutReducer";
import contextMenuReducer from "../reducers/contextMenuReducer";

export default combineReducers({
    settings: settingsReducer,
    items: itemReducer,
    neighbors: neighborsReducer,
    graph: graphReducer,
    visibilityFilters: graphFilterReducer,
    lanes: laneReducer,
    coverage: testCoverageReducer,
    nodeTypes: nodeTypeReducer,
    layout: layoutReducer,
    contextmenu: contextMenuReducer
});