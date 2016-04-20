import React from "react";
import { Table, Tr, Td } from "reactable";

import { START, SUCCESS, ERROR } from "../../config/Settings";

class DataTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: 0
        };
    }

    createColumns(node) {
        return this.props.mapper.map((map, index2) => {
            const mappedNode = map.dataFunction ? map.dataFunction(node) : node;

            return (
                <Td
                  column={map.columnHeader}
                  value={map.sortableFunction ? map.sortableFunction(mappedNode) : mappedNode[map.property]}
                  key={index2}
                >
                    {map.contentMapping(mappedNode)}
                </Td>
            );
        });
    }

    createRows() {
        const { data, trClass } = this.props;

        return data.map((node, index) => {
            return (
                <Tr key={index} className={trClass && trClass(node)}>
                    {this.createColumns(node)}
                </Tr>
            );
        });
    }

    createFilter() {
        const { filter } = this.props;

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

        return filter.map((filterObj, index) => {
            const onClick = (event) => {
                this.state.active = index;
                filterObj.onClick(event);
            };

            return (
                <a onClick={onClick} style={this.state.active === index ? activeLinkStyle : linkStyle} key={index}>
                    {filterObj.body}
                </a>
            );
        });
    }

    render() {
        const { mapper, data, tableClass, itemsPerPage, pageButtonLimit, status, filter } = this.props;

        const sortable = mapper
            .filter(map => map.sortable)
            .map(map => map.columnHeader);

        const filterable = mapper
            .filter(map => map.filterable)
            .map(map => map.columnHeader);

        return (
            <div>
                {status === SUCCESS &&
                <div style={{ float: "left", padding: "10px 0px" }}>
                    {`${data.length} result${data.length !== 1 ? "s" : ""} found.`}
                </div>}

                {status === SUCCESS &&
                <div style={{ float: "right", padding: "10px 0px" }}>
                    {filter && this.createFilter()}
                </div>}

                <Table className={tableClass}
                  itemsPerPage={itemsPerPage}
                  sortable={sortable}
                  filterable={filterable}
                  pageButtonLimit={pageButtonLimit}
                >
                    {this.createRows()}
                </Table>
            </div>
        );
    }
}

DataTable.propTypes = {
    data: React.PropTypes.array.isRequired,
    status: React.PropTypes.oneOf([SUCCESS, ERROR, START]).isRequired,
    tableClass: React.PropTypes.string,
    trClass: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.func
    ]),
    itemsPerPage: React.PropTypes.number,
    pageButtonLimit: React.PropTypes.number,
    mapper: React.PropTypes.array.isRequired,
    filter: React.PropTypes.array
};

export default DataTable;
