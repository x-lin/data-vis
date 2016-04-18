import React from "react";
import { Table, Tr, Td } from "reactable";

const DataTable = ({
    data,
    tableClass,
    trClass,
    isSuccess,
    isStart,
    isError,
    itemsPerPage,
    pageButtonLimit,
    sortable,
    filterable,
    mapper,
    filter
    }) => {

    const mappingObj = mapper.reduce((obj, entry) => {
        obj[entry.property] = {
            columnHeader: entry.columnHeader,
            contentMapping: entry.contentMapping,
            dataFunction: entry.dataFunction
        };

        return obj;
    }, {});



    const d = data.map((node, index) => {
        return (
            <Tr key={index} className={trClass(node)}>
                {
                    mapper.map((map, index2) => {
                        const mappedNode = map.dataFunction ? map.dataFunction(node) : node;

                        return <Td column={map.columnHeader} value={map.sortableFunction ? map.sortableFunction(mappedNode) : mappedNode[map.property]} key={index2}>
                            {map.contentMapping(mappedNode)}
                        </Td>
                    })
                }
            </Tr>
        );
    })

    return <div>
        {isSuccess &&
        <div style={{ float: "left", padding: "10px 0px" }}>{`${data.length} result${data.length !== 1 ? "s" : ""} found.`}</div>}

        {isSuccess &&
        <div style={{ float: "right", padding: "10px 0px" }}>
            {filter}
        </div>}

        <Table className={tableClass}
               itemsPerPage={itemsPerPage}
               sortable={sortable}
               filterable={filterable}
               pageButtonLimit={pageButtonLimit}>
            {d}
        </Table>
    </div>

};


export default DataTable;
