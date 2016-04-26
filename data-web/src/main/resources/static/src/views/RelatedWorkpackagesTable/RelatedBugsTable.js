import React from "react";

import Constants from "../../config/Constants";
import DataTable from "../widgets/DataTable";
import { createMapping } from "../../utils/TableMapping";

class RelatedBugsTable extends React.Component {
    onNameClick(key) {
        this.props.searchNeighborsStart("GeneralNode", key);
    }

    getMapper() {
        const jamaUrlMapper = createMapping()
            .setProperty("jamaId")
            .setColumnHeader("")
            .setContentMapping((data) => {
                return (
                    <span>
                        <a href={Constants.getJamaAddress(data.bug.jamaId, data.bug.projectId)} target="_blank">
                            <img src="img/jama-logo.png" className="tableImg" alt="Jama logo" />
                        </a>
                    </span>
                );
            })
            .getMapping();

        const jiraUrlMapper = createMapping()
            .setProperty("jiraId")
            .setColumnHeader(" ")
            .setContentMapping((data) => {
                return (
                    <span>
                        {data.bug.jiraId && <a href={Constants.getJiraAddress("Defect", data.bug.jiraId)} target="_blank">
                            <img src="img/jira-logo.png" className="tableImg" alt="JIRA logo" />
                        </a>}
                    </span>
                );
            })
            .getMapping();

        const nameMapper = createMapping()
            .setProperty("name")
            .setColumnHeader("Name")
            .setContentMapping((bug) => {
                return <a onClick={() => this.onNameClick(bug.key)}>{bug.name}</a>;
            })
            .setDataFunction((data) => {
                return data.bug;
            })
            .setSortable(true)
            .setFilterable(true)
            .getMapping();

        //const statusMapper = createMapping()
        //    .setProperty("status")
        //    .setColumnHeader("Status")
        //    .setContentMapping((node) => {
        //        return node.status;
        //    })
        //    .setDataFunction((data) => {
        //        return data.node;
        //    })
        //    .setSortable(true)
        //    .setFilterable(true)
        //    .getMapping();

        const pathMapper = createMapping()
            .setProperty("paths")
            .setColumnHeader("Paths")
            .setContentMapping((node) => {
                return node.paths ? node.paths.length : 0;
            })
            .getMapping();

        return [jamaUrlMapper, jiraUrlMapper, nameMapper, pathMapper];
    }

    filter(bool) {
        this.setState({ filter: bool });
    }

    render() {
        let data = this.props.data;
        let status = this.props.status;

        return (
            <DataTable
                data={data}
                tableClass="table table-bordered table-hover sidebar-table"
                itemsPerPage={100}
                mapper={this.getMapper()}
                status={status}
            />
        );
    }
}

RelatedBugsTable.propTypes = {
    status: React.PropTypes.string.isRequired,
    data: React.PropTypes.array.isRequired,
    searchNeighborsStart: React.PropTypes.func.isRequired
};

export default RelatedBugsTable;
