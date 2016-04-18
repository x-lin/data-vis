var React = require("react");
import Router from "react-router";
import { Link } from "react-router";
import { connect } from "react-redux";

import InfoSideBar from "./Settings/InfoSideBar";
import SearchBarComponent from "./SearchBar/SearchBarContainer";
import MenuContainer from "./Menu/MenuContainer";

export default class Main extends React.Component {
    render() {
        return (
            <div>
                <header className="main-header">

                    <a name="Frequentis Logo" className="logo disabled-link">
                        &nbsp;
                        <img src="img/frequentis-logo.gif" width="120px" />
                    </a>

                    <nav className="navbar navbar-static-top">
                            <div className="collapse navbar-collapse pull-left" id="navbar-collapse">
                                <ul className="nav navbar-nav">
                                </ul>
                            </div>

                            <div className="navbar-custom-menu">
                                <MenuContainer />
                            </div>
                    </nav>
                </header>

                <InfoSideBar />

                <div className="content-wrapper">
                    {this.props.children}
                </div>

            </div>
        );
    }
};
