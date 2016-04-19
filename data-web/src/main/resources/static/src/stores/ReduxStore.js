import { createStore as createReduxStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { persistStore, autoRehydrate } from "redux-persist";
import localforage from "localforage";

import combined from "../reducers/combined";

// Loading pre-configured data from server
import { getNodeTypes } from "../actions/aggregated/promises/GETNodeTypesActions";

export const middlewares = [thunkMiddleware];

export const createStore = () => {
    return createReduxStore(
        combined,
        compose(
            autoRehydrate(),
            applyMiddleware.apply(null, middlewares)
        )
    );
};

export const store = createStore();

store.dispatch(getNodeTypes());

// persistStore(store, {storage: localforage}).purgeAll();
persistStore(store, { storage: localforage });
