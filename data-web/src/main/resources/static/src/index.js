import React from "react";
import ReactDOM from "react-dom";
import { Router, hashHistory, Route, IndexRoute } from "react-router";
import { store } from "./stores/ReduxStore";
import { Provider } from "react-redux";
import { polyfill } from "es6-promise";

import Main from "./views/Main";
import Relations from "./views/MainViews/Relations";

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Main}>
                {/* <Route path="relationships" component={Relations} /> */}
                <IndexRoute component={Relations} /> /* default path -> take this, if no other match */
            </Route>
        </Router>
    </Provider>,
    $("#root")[0]
);

polyfill();
