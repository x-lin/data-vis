import React from "react";

import { TEST_COVERAGE_FETCH_START, TEST_COVERAGE_FETCH_SUCCESS } from "../../actions/action-creators/TestCoverageActions";
import GraphPanel from "../GraphPanel/GraphPanel";
import Constants from "../../config/Constants";

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isGraphPanelOpen : true,
            filter: false
        };
    }

    componentDidMount() {
        if(this.props.searchType && this.props.searchKey) {
            this.props.searchTestCoverage(this.props.searchType, this.props.searchKey);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.searchKey !== nextProps.searchKey && nextProps.searchType && nextProps.searchKey) {
            this.props.searchTestCoverage(nextProps.searchType, nextProps.searchKey);
        }
    }

    onClick(key) {
        this.props.searchNeighborsStart("GeneralNode", key);
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
                    <td><a onClick={(key) => this.onClick(coverage.key)}>{coverage.key}</a></td>
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

                        <div className="box-header with-border"><h4>{this.props.searchKey}</h4></div>

                        <div className="box-body">
                            { this.props.coverage.status === TEST_COVERAGE_FETCH_SUCCESS &&
                            `${data.length} result${data.length !== 1 ? "s" : ""} found.`}
                            {this.props.coverage.status === TEST_COVERAGE_FETCH_SUCCESS &&
                            <div><a onClick={(filter) => this.filter(false)}>Show All</a>&nbsp; | &nbsp;
                                <a onClick={(filter) => this.filter(true)}>Show Uncovered</a></div>}

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