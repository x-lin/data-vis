import React from "react";

import Constants from "../../config/Constants";
import DataTable from "../widgets/DataTable";
import { createMapping } from "../../utils/TableMapping";
import Label from "../widgets/Label";

class QueryBuilderTable extends React.Component {
    onNameClick(key) {
        this.props.searchNeighborsStart("GeneralNode", key);
    }

    getMapper() {
        const mapper = [];

        if (this.props.data.length > 0) {
            for (const key in this.props.data[0]) {
                const mapping = createMapping()
                    .setProperty("name")
                    .setColumnHeader(key)
                    .setContentMapping((object) => {
                        if (object !== null) {
                            return <span>
                                <Label bgColor={Constants.getColor(object.type)}>{object.type}</Label> &nbsp;
                                <a onClick={() => this.onNameClick(object.key)}>{object.name}</a>
                            </span>;
                        } else {
                            return "-";
                        }
                    })
                    .setDataFunction((data) => {
                        return data[key];
                    })
                    .setSortable(true)
                    .setFilterable(true)
                    .getMapping();

                mapper.push(mapping);
            }
        }

        return mapper;
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

QueryBuilderTable.propTypes = {
    status: React.PropTypes.string.isRequired,
    data: React.PropTypes.array.isRequired,
    searchNeighborsStart: React.PropTypes.func.isRequired
};

export default QueryBuilderTable;
