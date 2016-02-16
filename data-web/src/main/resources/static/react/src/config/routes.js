import React from "react";
import { Route, IndexRoute } from "react-router";

import Main from "../views/Main";
import Home from "../views/Home/Home";
import Relations from "../views/Relations/Relations";
//import Profile from "../components/Profile";

export default (
    <Route path="/" component={Main}>
        <Route name="relationships" path="relationships" component={Relations} />
        <IndexRoute component={Relations} /> /* default path -> take this, if no other match */
    </Route>
);