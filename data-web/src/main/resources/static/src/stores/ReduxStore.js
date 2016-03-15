import { createStore as createReduxStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';

import { itemReducer } from "../reducers/ItemReducer";
import { neighborsReducer } from "../reducers/NeighborsReducer";
import { graphReducer } from "../reducers/GraphReducer";
import { settingsReducer } from "../reducers/SettingsReducer";
import { graphFilterReducer } from "../reducers/GraphFilterReducer";
import { schemaReducer } from "../reducers/SchemaReducer";
import LaneReducer from "../reducers/LaneReducer";
import TestCoverageReducer from "../reducers/TestCoverageReducer";

export const createStore = () => {
    const allReducers = combineReducers({
        settings: settingsReducer,
        items: itemReducer,
        neighbors: neighborsReducer,
        graph: graphReducer,
        visibilityFilters: graphFilterReducer,
        schema: schemaReducer,
        lanes: LaneReducer,
        coverage: TestCoverageReducer
    });

    return createReduxStore(allReducers, applyMiddleware(
        thunkMiddleware // lets us dispatch() asynchronous functions
    ));
};

export const store = createStore();