import React from "react";
import ReactDOM from "react-dom";
import { Router, hashHistory, Route, IndexRoute } from "react-router";

import { createStore } from "./stores/ReduxStore";
//import Provider from "./views/Provider";
import { Provider, connect } from "react-redux";

import Main from "./views/Main";
import Home from "./views/Home/Home";
import Relations from "./views/Relations/Relations";
//
//ReactDOM.render (
//<Router history={hashHistory} store={createStore()}>{Routes}</Router>,
//    document.getElementById("root")
//);

ReactDOM.render (
    <Provider store={createStore()}>
        <Router history={hashHistory}>
            <Route path="/" component={Main}>
                <Route path="/relationships" component={Relations} />
                <IndexRoute component={Relations} /> /* default path -> take this, if no other match */
            </Route>
        </Router>
    </Provider>,
    document.getElementById("root")
);