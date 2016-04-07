import React from "react";
import { Table, Tr, Td, Thead, Th } from "reactable";

import { TEST_COVERAGE_FETCH_START, TEST_COVERAGE_FETCH_SUCCESS } from "../../actions/action-creators/TestCoverageActions";
import GraphPanel from "../GraphPanel/GraphPanel";
import Constants from "../../config/Constants";
import CircleSpan from "../widgets/CircleSpan";
import Label from "../widgets/Label";

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: false
        };
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

        const prepared = data.map((coverage, index) => {
            const count = coverage.testcases ? coverage.testcases.length : 0;

            return (
                <Tr key={index} className = { count ? "" :  "bg-red"}>
                    <Td column=""><a href={Constants.getJamaAddress(coverage.node.jamaId, coverage.node.projectId)} target="_blank">
                        <img src="img/jama-logo.png" className="tableImg" /></a>
                    </Td>
                    {/*<Td column="Key" style={{whiteSpace: "nowrap"}}>{coverage.key}</Td>*/}
                    <Td column="Name" value={coverage.name}><a onClick={(key) => this.onClick(coverage.key)}>{coverage.name}</a></Td>
                    <Td column="Type" value={coverage.type}><Label bgColor={Constants.getColor(coverage.type)}>{coverage.type}</Label></Td>
                    <Td column="Status">{coverage.node.status}</Td>
                    <Td column="Test Cases">{coverage.testcases ? coverage.testcases.length : 0}</Td>
                </Tr>
            );
        });

        const linkStyle = {
            color: "#444",
            boxShadow: "0 0 0 .03em #ddd",
            padding: "6px 8px"
        };

        const activeLinkStyle = {
            backgroundColor: "#2c3b41",
            color: "#fff",
            boxShadow: "0 0 0 .03em #2c3b41",
            pointerEvents: "none",
            cursor: "default",
            padding: "6px 8px"
        };

        return (
            <div className="box box-solid">
                <div className="box-header with-border">
                    <p>
                        <span className="label label-default">Test Coverage</span>&nbsp;
                        <span className="label" style={{backgroundColor: Constants.getColor(this.props.coverage.name.type), color: Constants.getContrastColor(Constants.getColor(this.props.coverage.name.type))}}>{this.props.coverage.name.type}</span>
                    </p>
                    <h3 className="box-title">
                        <CircleSpan color={Constants.getColor(this.props.coverage.name.type)} radius={"12px"} /> <strong>{this.props.coverage.name.name}</strong>
                    </h3>
                    <div className="box-tools pull-right">
                        <button className="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="" data-original-title="Collapse"><span className="fa fa-minus" /></button>
                        <button type="button" className="btn btn-box-tool" onClick={() => this.props.setPanelInvisible()}><span className="fa fa-times" /></button>
                    </div>
                </div>

                <div className="box-body">
                    { this.props.coverage.status === TEST_COVERAGE_FETCH_SUCCESS &&
                    <div style={{float: "left", padding: "10px 0px"}}>{`${data.length} result${data.length !== 1 ? "s" : ""} found.`}</div>}

                    {this.props.coverage.status === TEST_COVERAGE_FETCH_SUCCESS &&
                    <div style={{float: "right", padding: "10px 0px"}}><a onClick={(filter) => this.filter(false)} style={this.state.filter ? linkStyle : activeLinkStyle}>Show All</a>
                        <a onClick={(filter) => this.filter(true)} style={this.state.filter ? activeLinkStyle : linkStyle}>Show With No Test Cases</a></div>}

                    <Table className="table table-bordered table-hover sidebar-table" itemsPerPage={100} sortable={["Key", "Status", "Type", "Name", "Test Cases"]}
                           filterable={['Name', 'Key', 'Status', 'Type']}>
                        {prepared}
                    </Table>
                </div>

                {this.props.coverage.status === TEST_COVERAGE_FETCH_START &&
                <div className="overlay">
                    <i className="fa fa-refresh fa-spin" />
                </div>}
            </div>
        )
    }
}