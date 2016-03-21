import React from "react";

import { TEST_COVERAGE_FETCH_START, TEST_COVERAGE_FETCH_SUCCESS } from "../../actions/action-creators/TestCoverageActions";
import GraphPanel from "../GraphPanel/GraphPanel";
import Constants from "../../config/Constants";

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isGraphPanelOpen : false,
            filter: false
        };
    }

    componentDidUpdate() {
        if (typeof $.fn.slimScroll != "undefined") {
            //Destroy if it exists
            $("#mytest").slimScroll({destroy: true}).height("auto");
            //Add slimscroll
            $("#mytest").slimscroll({
                //height: ($(window).height() - $(".main-header").height()) + "px",
                color: "rgba(0,0,0,0.2)",
                size: "3px"
            });
        }
    }

    componentDidMount() {
        this.props.searchTestCoverage("PVCSC");
    }

    onClick(key) {
        this.props.searchNeighborsStart("GeneralNode", key);
        this.setState({isGraphPanelOpen : true});
    }

    filter(bool) {
        this.setState({filter : bool});
    }

    render() {
        let data = this.props.coverage.data;

        if(this.state.filter) {
            data = data.filter((coverage) => {
                return !coverage.testcases || coverage.testcases.length === 0;
            })
        }

        const table = data.map((coverage, index) => {
            const count = coverage.testcases ? coverage.testcases.length : 0;

            return (
                <tr key={index} className = { count ? "" :  "bg-red"}>
                    <td><a href={Constants.getJamaAddress(coverage.node.jamaId, coverage.node.projectId)} target="_blank">
                        <img src="img/jama-logo.png" className="tableImg" /></a>
                    </td>
                    <td><a href="#coverage" onClick={(key) => this.onClick(coverage.key)}>{coverage.key}</a></td>
                    <td>{coverage.name}</td>
                    <td>{coverage.type}</td>
                    <td>{coverage.testcases ? coverage.testcases.length : 0}</td>
                </tr>
            );
        });

        const height = this.state.isGraphPanelOpen ? "calc(50vh - 50px)" : "calc(100vh - 50px)";

        return (
            <div>
                {this.state.isGraphPanelOpen && <div style={{ height: "50vh" }}><GraphPanel /></div>}

                { this.props.coverage.status === TEST_COVERAGE_FETCH_START && "Fetching data..."}

                <div style={{overflow: "auto", height: height}}>
                    <div className="box box-solid">
                        { this.props.coverage.status === TEST_COVERAGE_FETCH_SUCCESS &&
                        `${data.length} result${data.length !== 1 ? "s" : ""} found.`}
                            {this.props.coverage.status === TEST_COVERAGE_FETCH_SUCCESS &&
                            <div><a href="#coverage" onClick={(filter) => this.filter(false)}>Show All</a>&nbsp; | &nbsp;
                                <a href="#coverage" onClick={(filter) => this.filter(true)}>Show Uncovered</a></div>}
                        <div className="box-body">
                            <table id="table" className="table table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th style={{width: "15px"}}></th>
                                    <th>Key</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Test Cases</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {table}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}