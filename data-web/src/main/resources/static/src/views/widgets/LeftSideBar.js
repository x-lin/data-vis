import React from "react";

export default class extends React.Component {
    componentDidMount() {
        $("#range4").ionRangeSlider({
            type: "single",
            min: 1,
            max: 20,
            step: 1,
            grid: true,
            grid_snap: true
        });
    }

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
                                    <div>
                                        {/*<span className="irs">
                                            <span className="irs-line">
                                                <span className="irs-line-left"></span>
                                                <span className="irs-line-mid"></span>
                                                <span className="irs-line-right"></span>
                                            </span>
                                            <span className="irs-min" style={{display: "none"}}>1</span>
                                            <span className="irs-max" style={{display: "none"}}>20</span>
                                            <span className="irs-from" style={{display: "none"}}>1</span>
                                            <span className="irs-to" style={{display: "none"}}>20</span>
                                            <span className="irs-single" style={{left: "100px"}}>10</span>
                                            <span className="irs-slider single" style={{left: "120px"}}></span>
                                        </span>*/}
                                        <input id="range4" type="text" name="range4" />
                                    </div>


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