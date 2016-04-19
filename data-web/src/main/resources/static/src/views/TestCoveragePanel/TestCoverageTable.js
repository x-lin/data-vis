import React from "react";

import { TEST_COVERAGE_FETCH_START, TEST_COVERAGE_FETCH_SUCCESS, TEST_COVERAGE_FETCH_ERROR }
    from "../../actions/action-creators/TestCoverageActions";
import Constants from "../../config/Constants";
import Label from "../widgets/Label";
import DataTable from "../widgets/DataTable";
import { START, SUCCESS, ERROR } from "../../config/Settings";
import { createMapping } from "../../utils/TableMapping";
import TestCoverageHeader from "./TestCoverageHeader";

class TestCoverageTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: false
        };
    }

    onNameClick(key) {
        this.props.searchNeighborsStart("GeneralNode", key);
    }

    getMapper() {
        const jamaUrlMapper = createMapping()
            .setProperty("jamaId")
            .setColumnHeader("")
            .setContentMapping((node) => {
                return (
                    <a href={Constants.getJamaAddress(node.jamaId, node.projectId)} target="_blank">
                        <img src="img/jama-logo.png" className="tableImg" alt="Jama logo" />
                    </a>
                );
            })
            .setDataFunction((data) => {
                return data.node;
            })
            .getMapping();

        const nameMapper = createMapping()
            .setProperty("name")
            .setColumnHeader("Name")
            .setContentMapping((node) => {
                return <a onClick={() => this.onNameClick(node.key)}>{node.name}</a>;
            })
            .setSortable(true)
            .setFilterable(true)
            .getMapping();

        const typeMapper = createMapping()
            .setProperty("type")
            .setColumnHeader("Type")
            .setContentMapping((node) => {
                return <Label bgColor={Constants.getColor(node.type)}>{node.type}</Label>;
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
            .setSortableFunction(data => data.testcases.length)
            .setFilterable(true)
            .getMapping();

        return [jamaUrlMapper, nameMapper, typeMapper, statusMapper, testCaseMapper];
    }

    getStatus() {
        switch (this.props.coverage.status) {
            case TEST_COVERAGE_FETCH_START:
                return START;
            case TEST_COVERAGE_FETCH_SUCCESS:
                return SUCCESS;
            case TEST_COVERAGE_FETCH_ERROR:
                return ERROR;
            default:
                return START;
        }
    }

    filter(bool) {
        this.setState({ filter: bool });
    }

    render() {
        let data = this.props.coverage.data;

        if (this.state.filter) {
            data = data.filter((coverage) => {
                return !coverage.testcases || coverage.testcases.length === 0;
            });
        }

        const filter = [
            { onClick: () => this.filter(false), body: "Show All" },
            { onClick: () => this.filter(true), body: "Show With No Test Cases" }
        ];

        return (
            <div className="box box-solid">
                {
                    <TestCoverageHeader
                      type={this.props.coverage.node.type}
                      name={this.props.coverage.node.name}
                      setPanelInvisible={this.props.setPanelInvisible}
                    />
                }

                <div className="box-body">
                    <DataTable
                      filter={filter}
                      data={data}
                      tableClass="table table-bordered table-hover sidebar-table"
                      itemsPerPage={100}
                      mapper={this.getMapper()}
                      dataMapper={data => data.node}
                      trClass={data => ((data.testcases && data.testcases.length > 0) ? "" : "bg-red")}
                      status={this.getStatus()}
                    />
                </div>

                {this.props.coverage.status === TEST_COVERAGE_FETCH_START &&
                <div className="overlay">
                    <i className="fa fa-refresh fa-spin" />
                </div>}
            </div>
        );
    }
}

TestCoverageTable.propTypes = {
    coverage: React.PropTypes.object.isRequired,
    setPanelInvisible: React.PropTypes.func.isRequired,
    searchNeighborsStart: React.PropTypes.func.isRequired
};

export default TestCoverageTable;
