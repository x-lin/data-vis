import React from "react";
import ReactDOM from "react-dom";
import { Router, hashHistory, Route, IndexRoute } from "react-router";

import { store } from "./stores/ReduxStore";
import { Provider, connect } from "react-redux";

import Main from "./views/Main";
import Relations from "./views/MainViews/Relations";
import Tree from "./views/TreePanel/Tree";
import Schema from "./views/MainViews/SchemaComponent";

import { polyfill } from "es6-promise";

ReactDOM.render (
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Main}>
                {/*<Route path="relationships" component={Relations} />
                <Route path="tree" component={Tree} />
                <Route path="schema/:project" component={Schema} />*/}
                <IndexRoute component={Relations} /> /* default path -> take this, if no other match */
            </Route>
        </Router>
    </Provider>,
    $("#root")[0]
);

polyfill();