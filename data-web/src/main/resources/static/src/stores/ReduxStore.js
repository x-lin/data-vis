import { createStore as createReduxStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware from 'redux-thunk';
import undoable from 'redux-undo';
import {persistStore, autoRehydrate} from 'redux-persist';
import localforage from "localforage";

import combined from "../reducers/combined";

//Loading pre-configured data from server
import { getNodeTypes } from "../actions/aggregated/GETNodeTypes";

export const createStore = () => {
    return createReduxStore(
        combined,
        compose(
            autoRehydrate(),
            applyMiddleware(thunkMiddleware)
        ));
};

export const store = createStore();

store.dispatch(getNodeTypes());

//persistStore(store, {storage: localforage}).purgeAll();
persistStore(store, {storage: localforage});