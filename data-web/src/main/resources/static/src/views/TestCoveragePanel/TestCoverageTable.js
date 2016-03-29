import React from "react";
import { Table, Tr, Td, Thead, Th } from "reactable";

import { TEST_COVERAGE_FETCH_START, TEST_COVERAGE_FETCH_SUCCESS } from "../../actions/action-creators/TestCoverageActions";
import GraphPanel from "../GraphPanel/GraphPanel";
import Constants from "../../config/Constants";

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isPanelOpen : true,
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

        const height = this.state.isPanelOpen ?  "calc(100vh - 50px)" : "";

        const prepared = data.map((coverage, index) => {
            const count = coverage.testcases ? coverage.testcases.length : 0;

            return (
                <Tr key={index} className = { count ? "" :  "bg-red"}>
                    <Td column=""><a href={Constants.getJamaAddress(coverage.node.jamaId, coverage.node.projectId)} target="_blank">
                        <img src="img/jama-logo.png" className="tableImg" /></a>
                    </Td>
                    {/*<Td column="Key" style={{whiteSpace: "nowrap"}}>{coverage.key}</Td>*/}
                    <Td column="Name" value={coverage.name}><a onClick={(key) => this.onClick(coverage.key)}>{coverage.name}</a></Td>
                    <Td column="Type">{coverage.type}</Td>
                    <Td column="Status">{coverage.node.status}</Td>
                    <Td column="Test Cases">{coverage.testcases ? coverage.testcases.length : 0}</Td>
                </Tr>
            );
        });

        return (
            <div>
                <div id="container" style={{width: "100%", float: "left", marginRight: "-500px"}}><div style={{marginRight: "500px", height: height}}><GraphPanel /></div></div>

                { this.props.coverage.status === TEST_COVERAGE_FETCH_START && "Fetching data..."}

                <div style={{overflow: "auto", float: "right", width: "500", height: height}}>
                    <div className="box box-solid">

                        <div className="box-header with-border"><h4>{this.props.searchKey}</h4></div>

                        <div className="box-body">
                            { this.props.coverage.status === TEST_COVERAGE_FETCH_SUCCESS &&
                            `${data.length} result${data.length !== 1 ? "s" : ""} found.`}
                            {this.props.coverage.status === TEST_COVERAGE_FETCH_SUCCESS &&
                            <div><a onClick={(filter) => this.filter(false)}>Show All</a>&nbsp; | &nbsp;
                                <a onClick={(filter) => this.filter(true)}>Show Uncovered</a></div>}

                            <Table className="table table-bordered table-hover" itemsPerPage={100} sortable={["Key", "Status", "Type", "Name"]}
                               filterable={['Name', 'Key', 'Status', 'Type']}>
                                {prepared}
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}