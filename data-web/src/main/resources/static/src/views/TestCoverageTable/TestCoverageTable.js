import React from "react";

import Constants from "../../config/Constants";
import Label from "../widgets/Label";
import DataTable from "../widgets/DataTable";
import { createMapping } from "../../utils/TableMapping";

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

    filter(bool) {
        this.setState({ filter: bool });
    }

    render() {
        let data = this.props.data;
        let status = this.props.status;

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
            <DataTable
              filter={filter}
              data={data}
              tableClass="table table-bordered table-hover sidebar-table"
              itemsPerPage={100}
              mapper={this.getMapper()}
              trClass={data => ((data.testcases && data.testcases.length > 0) ? "" : "bg-red")}
              status={status}
            />
        );
    }
}

TestCoverageTable.propTypes = {
    status: React.PropTypes.string.isRequired,
    data: React.PropTypes.array.isRequired,
    searchNeighborsStart: React.PropTypes.func.isRequired
};

export default TestCoverageTable;
