import { createStore as createReduxStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware from 'redux-thunk';
import undoable from 'redux-undo';
import {persistStore, autoRehydrate} from 'redux-persist';
import localforage from "localforage";

import { itemReducer } from "../reducers/ItemReducer";
import { neighborsReducer } from "../reducers/NeighborsReducer";
import { graphReducer } from "../reducers/GraphReducer";
import { settingsReducer } from "../reducers/SettingsReducer";
import { graphFilterReducer } from "../reducers/GraphFilterReducer";
import { schemaReducer } from "../reducers/SchemaReducer";
import LaneReducer from "../reducers/LaneReducer";
import TestCoverageReducer from "../reducers/TestCoverageReducer";
import NodeTypeReducer from "../reducers/NodeTypeReducer";
import LayoutReducer from "../reducers/LayoutReducer";
import ContextMenuReducer from "../reducers/ContextMenuReducer";

//Loading pre-configured data from server
import { getNodeTypes } from "../actions/aggregated/GETNodeTypes";

export const createStore = () => {
    const allReducers = combineReducers({
        settings: settingsReducer,
        items: itemReducer,
        neighbors: neighborsReducer,
        graph: graphReducer,
        visibilityFilters: graphFilterReducer,
        schema: schemaReducer,
        lanes: LaneReducer,
        coverage: TestCoverageReducer,
        nodeTypes: NodeTypeReducer,
        layout: LayoutReducer,
        contextmenu: ContextMenuReducer
    });

    return createReduxStore(allReducers,
        compose(
            autoRehydrate(),
            applyMiddleware(thunkMiddleware)
        ));
};

export const store = createStore();

store.dispatch(getNodeTypes());

//persistStore(store, {storage: localforage}).purgeAll();
persistStore(store, {storage: localforage});