import { createStore as createReduxStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';

import { itemReducer } from "../reducers/ItemReducer";
import { neighborsReducer } from "../reducers/NeighborsReducer";
import { graphReducer } from "../reducers/GraphReducer";
import { settingsReducer } from "../reducers/SettingsReducer";

export const createStore = () => {
    const allReducers = combineReducers({
        settings: settingsReducer,
        items: itemReducer,
        neighbors: neighborsReducer,
        graph: graphReducer
    });

    return createReduxStore(allReducers, applyMiddleware(
        thunkMiddleware // lets us dispatch() asynchronous functions
    ));
};

export const store = createStore();