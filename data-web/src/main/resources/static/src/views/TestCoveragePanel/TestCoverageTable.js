import React from "react";
import { Table, Tr, Td } from "reactable";

import { TEST_COVERAGE_FETCH_START, TEST_COVERAGE_FETCH_SUCCESS }
    from "../../actions/action-creators/TestCoverageActions";
import Constants from "../../config/Constants";
import Label from "../widgets/Label";
import DataTable from "../widgets/DataTable";
import { createMapping } from "../../utils/TableMapping";

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

        const filter = <div>
            <a onClick={(filter) => this.filter(false)} style={this.state.filter ? linkStyle : activeLinkStyle}>Show All</a>
            <a onClick={(filter) => this.filter(true)} style={this.state.filter ? activeLinkStyle : linkStyle}>Show With No Test Cases</a>
        </div>;

        const jamaUrlMapper = createMapping()
            .setProperty("jamaId")
            .setColumnHeader("")
            .setContentMapping((node) => {
                return <a href={Constants.getJamaAddress(node.jamaId, node.projectId)} target="_blank">
                    <img src="img/jama-logo.png" className="tableImg" /></a>
            })
            .setDataFunction((data) => {
                return data.node;
            })
            .getMapping();

        const nameMapper = createMapping()
            .setProperty("name")
            .setColumnHeader("Name")
            .setContentMapping((node) => {
                return <a onClick={(key) => this.onClick(node.key)}>{node.name}</a>
            })
            .setSortable(true)
            .setFilterable(true)
            .getMapping();

        const typeMapper = createMapping()
            .setProperty("type")
            .setColumnHeader("Type")
            .setContentMapping((node) => {
                return <Label bgColor={Constants.getColor(node.type)}>{node.type}</Label>
            })
            .setDataFunction((data) => {
                return data.node;
            })
            .setSortable(true)
            .setFilterable(true)
            .getMapping();

        const statusMapper = createMapping()
            .setProperty("status")
            .setColumnHeader("Status")
            .setContentMapping((node) => {
                return node.status;
            })
            .setDataFunction((data) => {
                return data.node;
            })
            .setSortable(true)
            .setFilterable(true)
            .getMapping();

        const testCaseMapper = createMapping()
            .setProperty("testcases")
            .setColumnHeader("Test Cases")
            .setContentMapping((node) => {
                return node.testcases ? node.testcases.length : 0;
            })
            .setSortable(true)
            .setSortableFunction((data) => { return data.testcases.length})
            .setFilterable(true)
            .getMapping();

        const mappers = [jamaUrlMapper, nameMapper, typeMapper, statusMapper, testCaseMapper];

        return (
            <div className="box box-solid">
                <div className="box-header with-border">
                    <p>
                        <span className="label label-default">Test Coverage</span>&nbsp;
                        <span className="label" style={{backgroundColor: Constants.getColor(this.props.coverage.name.type), color: Constants.getContrastColor(Constants.getColor(this.props.coverage.name.type))}}>{this.props.coverage.name.type}</span>
                    </p>
                    <h3 className="box-title">
                        <strong>{this.props.coverage.name.name}</strong>
                    </h3>
                    <div className="box-tools pull-right">
                        <button className="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="" data-original-title="Collapse"><span className="fa fa-minus" /></button>
                        <button type="button" className="btn btn-box-tool" onClick={() => this.props.setPanelInvisible()}><span className="fa fa-times" /></button>
                    </div>
                </div>

                <div className="box-body">
                    <DataTable
                        filter={filter}
                        data={data}
                        tableClass="table table-bordered table-hover sidebar-table"
                        isSuccess={ this.props.coverage.status === TEST_COVERAGE_FETCH_SUCCESS}
                        itemsPerPage={100}
                        sortable={["Key", "Status", "Type", "Name", "Test Cases"]}
                        filterable={['Name', 'Key', 'Status', 'Type']}
                        mapper={mappers}
                        dataMapper={(data) => {return data.node}}
                        trClass={(data) => {return (data.testcases  && data.testcases.length > 0) ? "" : "bg-red"}}
                    />
                </div>

                {this.props.coverage.status === TEST_COVERAGE_FETCH_START &&
                <div className="overlay">
                    <i className="fa fa-refresh fa-spin" />
                </div>}
            </div>
        )
    }
}