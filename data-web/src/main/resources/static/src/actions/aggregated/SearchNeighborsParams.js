export const params = {
    type: [],
    priority: [],
    excluded: [],
    limit: 0,
    upstream: null,
    downstream: null
};

export const createParams = (paramsPar) => {
    const paramsObj = paramsPar || Object.assign({}, params);

    return {
        addType(type) {
            if (paramsObj.type.indexOf(type) === -1) {
                paramsObj.type.push(type);
            }

            return createParams(paramsObj);
        },
        setTypes(types) {
            paramsObj.type = types;

            return createParams(paramsObj);
        },
        setLimit(limit) {
            paramsObj.limit = limit;

            return createParams(paramsObj);
        },
        addPriority(priority) {
            if (paramsObj.priority.indexOf(priority) === -1) {
                paramsObj.priority.push(priority);
            }

            return createParams(paramsObj);
        },
        setPriorities(priorities) {
            if (Array.isArray(paramsObj.priority)) {
                paramsObj.priority = priorities;
            }

            return createParams(paramsObj);
        },
        addExcluded(excluded) {
            if (paramsObj.excluded.indexOf(excluded) === -1) {
                paramsObj.excluded.push(excluded);
            }

            return createParams(paramsObj);
        },
        setExcluded(excluded) {
            if (Array.isArray(paramsObj.excluded)) {
                paramsObj.excluded = excluded;
            }

            return createParams(paramsObj);
        },
        setUpstream(upstream) {
            if (typeof upstream === "boolean") {
                paramsObj.upstream = upstream;
            }

            return createParams(paramsObj);
        },
        setDownstream(downstream) {
            if (typeof downstream === "boolean") {
                paramsObj.downstream = downstream;
            }

            return createParams(paramsObj);
        },
        getParams() {
            return paramsObj;
        }
    };
};

