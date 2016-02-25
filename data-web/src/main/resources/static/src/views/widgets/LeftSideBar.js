import React from "react";

import Slider from "./Slider";

export default class extends React.Component {
    render() {
        return (
            <aside className="main-sidebar">
                <section className="sidebar">

                    {/*<form action="#" method="get" className="sidebar-form">
                        <div className="input-group ">
                            <input type="text" name="q" className="form-control" placeholder="Search..." />
                                <span className="input-group-btn">
                                    <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i></button>
                                </span>
                        </div>
                    </form>*/}

                    <ul className="sidebar-menu">
                        <li className="header"><span className="fa  fa-filter"></span>&nbsp; Filters</li>
                    </ul>

                    <div className="box box-custom ">
                        <div className="box-header cursor" data-widget="collapse">
                            <h3 className="box-title box-title-custom">Basic Options</h3>
                            <i className="fa fa-angle-left pull-right"></i>
                        </div>

                        <div className="box-body box-content-custom">
                            <form method="post">
                                <div className="form-group       ">
                                    <label className="control-sidebar-subheading">Project
                                        <input type="checkbox" className="pull-right"  checked="checked" />
                                    </label>
                                    <label className="control-sidebar-subheading">Issue
                                        <input type="checkbox" className="pull-right"  checked="checked" />
                                    </label>
                                    <label className="control-sidebar-subheading">Requirement
                                        <input type="checkbox" className="pull-right"  checked="checked" />
                                    </label>
                                    <label className="control-sidebar-subheading">User
                                        <input type="checkbox" className="pull-right"  checked="checked" />
                                    </label>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="box box-custom">
                        <div className="box-header cursor" data-widget="collapse">
                            <h3 className="box-title box-title-custom">Neighbor Expansion</h3>
                            <i className="fa fa-angle-left pull-right"></i>
                        </div>

                        <div className="box-body box-content-custom">
                            <form method="post">
                                <div className="form-group">
                                    <label  className="control-sidebar-subheading">
                                        Show as single nodes
                                        <input type="radio" name="optionsRadios" className="pull-right" id="optionsRadios2" value="option2" checked="checked" />
                                    </label>

                                    <Slider min={1} max={20} defaultValue={10} onChange={function() {
                                        console.log("slider on change")
                                    }} />

                                    <label  className="control-sidebar-subheading">
                                        Show as clusters
                                        <input type="radio" name="optionsRadios" className="pull-right" id="optionsRadios1" value="option1" checked="" />
                                    </label>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="box box-custom collapsed-box">
                        <div className="box-header cursor" data-widget="collapse">
                            <h3 className="box-title box-title-custom">Graph Traversal</h3>
                            <i className="fa fa-angle-left pull-right"></i>
                        </div>
                        <div className="box-body box-content-custom">
                            The body of the boxdf
                        </div>
                    </div>

                </section>
            </aside>
        );
    };
}