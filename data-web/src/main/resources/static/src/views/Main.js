var React = require("react");
import Router from "react-router";
import { Link } from "react-router";
import { connect } from "react-redux";
import LanePicker from "./LanePicker/LanePicker";

import SettingsSideBarComponent from "./Settings/SettingsSideBarComponent";

export default class Main extends React.Component{ //creates react component
    //pushState() {
    //    this.props.history.pushState(null, "/relationships/");
    //};

    render() {
        return (
            <div>
                <LanePicker />
                <header className="main-header">

                    <a href="index.html" className="logo ">
                        &nbsp;
                        {/*<img src="img/frequentis-logo.gif" width="160px" />*/}
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
                                    <li><a href="#">Graph Navigator <span className="sr-only"></span></a></li>
                                    <li><a href="#tree">Tree <span className="sr-only"></span></a></li>
                                    <li><a href="#schema/QCUBE">Schema <span className="sr-only"></span></a></li>
                                    <li><a href="#coverage">Test Coverage<span className="sr-only"></span></a></li>
                                </ul>
                            </div>

                            <div className="navbar-custom-menu">
                                <ul className="nav navbar-nav">
                                    <li>
                                        <a href="#" data-toggle="control-sidebar"><i className="fa fa-gears" /></a>
                                    </li>
                                </ul>
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