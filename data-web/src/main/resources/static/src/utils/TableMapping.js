export const tableMapping = {
    property: null,
    columnHeader: null,
    dataFunction: null,
    sortable: false,
    sortableFunction: null,
    filterable: false,
    contentMapping: (data) => { return data; }
};

export const createMapping = (mappingPar) => {
    const mappingObj = mappingPar || Object.assign({}, tableMapping);

    return {
        setProperty(property) {
            if (typeof property === "string") {
                mappingObj.property = property;
            }

            return createMapping(mappingObj);
        },
        setColumnHeader(header) {
            if (typeof header === "string") {
                mappingObj.columnHeader = header;
            }

            return createMapping(mappingObj);
        },
        setContentMapping(mapping) {
            mappingObj.contentMapping = mapping;

            return createMapping(mappingObj);
        },
        setDataFunction(dataFunction) {
            mappingObj.dataFunction = dataFunction;

            return createMapping(mappingObj);
        },
        setSortable(sortable) {
            mappingObj.sortable = sortable;

            return createMapping(mappingObj);
        },
        setFilterable(filterable) {
            mappingObj.filterable = filterable;

            return createMapping(mappingObj);
        },
        setSortableFunction(sortableFunction) {
            mappingObj.sortableFunction = sortableFunction;

            return createMapping(mappingObj);
        },
        getMapping() {
            return mappingObj;
        }
    };
};

