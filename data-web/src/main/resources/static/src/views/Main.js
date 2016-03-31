var React = require("react");
import Router from "react-router";
import { Link } from "react-router";
import { connect } from "react-redux";
import LanePicker from "./LanePicker/LanePicker";

import SettingsSideBarComponent from "./Settings/SettingsSideBarComponent";
import SearchBarComponent from "../views/SearchBar/SearchBarComponent";
import FileLoaderComponent from "../views/GraphLoader/FileLoaderComponent";
import FileSaverComponent from "../views/GraphLoader/FileSaverComponent";
import NewGraphComponent from "../views/GraphLoader/NewGraphComponent";
import MenuComponent from "../views/Menu/MenuComponent";

export default class Main extends React.Component {

    render() {
        return (
            <div>
                <LanePicker />
                <header className="main-header">

                    <a name="Frequentis Logo" className="logo disabled-link">
                        &nbsp;
                        <img src="img/frequentis-logo.gif" width="120px" />
                    </a>

                    <nav className="navbar navbar-static-top">
                        {/*<div className="navbar-header">
                                <a href="../../index2.html" className="navbar-brand"><b>Admin</b>LTE</a>
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
                                    <i className="fa fa-bars"></i>
                                </button>
                            </div>*/}

                            <div className="collapse navbar-collapse pull-left" id="navbar-collapse">
                                <ul className="nav navbar-nav">
                                </ul>
                            </div>

                            <div className="navbar-custom-menu">
                                <MenuComponent />
                            </div>
                    </nav>
                </header>

                <SettingsSideBarComponent />

                <div className="content-wrapper">
                    {this.props.children}
                </div>

            </div>
        )
    }
};