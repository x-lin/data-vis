import React from "react";
import ReactDOM from "react-dom";
import { Router, hashHistory } from "react-router";

import Routes from "./config/Routes";
import { createStore } from "./stores/ReduxStore";
//import Provider from "./views/Provider";
import Relations from "./views/Relations/Relations";
import { Provider, connect } from "react-redux";

//ReactDOM.render (
//<Router history={hashHistory} store={createStore()}>{Routes}</Router>,
//    document.getElementById("root")
//);

ReactDOM.render (
    <Provider store={createStore()}>
        <Relations/>
    </Provider>,
    document.getElementById("root")
);