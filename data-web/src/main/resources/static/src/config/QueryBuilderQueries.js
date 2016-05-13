export const addRootNode = (rootNode, data) => {
    const edges = [...data.edges];

    edges[0].sourceId = rootNode.nodeId;

    const after = {
        nodes: [Object.assign({}, rootNode), ...data.nodes],
        edges
    };

    return after;
};

let i = 999;

export default () => {
    return [
        {
            name: "Test Coverage",
            key: "TC",
            data: {
                nodes: [
                    {
                        nodeId: 999,
                        isOutput: true,
                        optional: false,
                        filters: {
                            filters: [{
                                filterId: i++,
                                operator: { key: "or", name: "OR" },
                                filters: [
                                    {
                                        filterId: i++,
                                        isNot: false,
                                        filterType: { key: "Type", name: "Type" },
                                        relation: { key: "eq", name: "=" },
                                        value: { key: "SRS", name: "Software Requirement" }
                                    },
                                    {
                                        filterId: i++,
                                        isNot: false,
                                        filterType: { key: "Type", name: "Type" },
                                        relation: { key: "eq", name: "=" },
                                        value: { key: "SSS", name: "System Requirement" }
                                    },
                                ]
                            }],
                            operator: { key: "or", name: "OR" }
                        }
                    },
                    {
                        nodeId: 1000,
                        isOutput: true,
                        optional: true,
                        filters: {
                            filters: [{
                                filterId: i++,
                                operator: { key: "and", name: "OR" },
                                filters: [
                                    {
                                        filterId: i++,
                                        isNot: false,
                                        filterType: { key: "Type", name: "Type" },
                                        relation: { key: "eq", name: "=" },
                                        value: { key: "TC", name: "Test Case" }
                                    }
                                ]
                            }],
                            operator: { key: "and", name: "OR" }
                        }
                    }
                ],
                edges: [
                    {
                        sourceId: null,
                        targetId: 999,
                        direction: "Downstream",
                        minPathLength: 0,
                        maxPathLength: 5
                    },
                    {
                        sourceId: 999,
                        targetId: 1000,
                        direction: "Downstream",
                        minPathLength: 1,
                        maxPathLength: 1
                    }
                ]
            }
        },
        {
            name: "Related Features (Upstream)",
            key: "RF",
            data: {
                nodes: [
                    {
                        nodeId: 999,
                        isOutput: true,
                        optional: false,
                        filters: {
                            filters: [{
                                filterId: i++,
                                operator: { key: "or", name: "OR" },
                                filters: [
                                    {
                                        filterId: i++,
                                        isNot: false,
                                        filterType: { key: "Type", name: "Type" },
                                        relation: { key: "eq", name: "=" },
                                        value: { key: "FEAT", name: "Feature" }
                                    }
                                ]
                            }],
                            operator: { key: "or", name: "OR" }
                        }
                    }
                ],
                edges: [
                    {
                        sourceId: null,
                        targetId: 999,
                        direction: "Upstream",
                        minPathLength: 0,
                        maxPathLength: 8
                    }
                ]
            }
        },
        {
            name: "Related Work Packages",
            key: "RWP",
            data: {
                nodes: [
                    {
                        nodeId: 999,
                        isOutput: false,
                        optional: false,
                        filters: {
                            filters: [{
                                filterId: i++,
                                operator: { key: "or", name: "OR" },
                                filters: [
                                    {
                                        filterId: i++,
                                        isNot: false,
                                        filterType: { key: "Type", name: "Type" },
                                        relation: { key: "eq", name: "=" },
                                        value: { key: "SRS", name: "System Requirement" }
                                    },
                                    {
                                        filterId: i++,
                                        isNot: false,
                                        filterType: { key: "Type", name: "Type" },
                                        relation: { key: "eq", name: "=" },
                                        value: { key: "SSS", name: "Software Requirement" }
                                    },
                                    {
                                        filterId: i++,
                                        isNot: false,
                                        filterType: { key: "Type", name: "Type" },
                                        relation: { key: "eq", name: "=" },
                                        value: { key: "FEAT", name: "Feature" }
                                    }
                                ]
                            }],
                            operator: { key: "or", name: "OR" }
                        }
                    },
                    {
                        nodeId: 1000,
                        isOutput: true,
                        optional: false,
                        filters: {
                            filters: [{
                                filterId: i++,
                                operator: { key: "or", name: "OR" },
                                filters: [
                                    {
                                        filterId: i++,
                                        isNot: false,
                                        filterType: { key: "Type", name: "Type" },
                                        relation: { key: "eq", name: "=" },
                                        value: { key: "WP", name: "Work Package" }
                                    }
                                ]
                            }],
                            operator: { key: "or", name: "OR" }
                        }
                    }
                ],
                edges: [
                    {
                        sourceId: null,
                        targetId: 999,
                        direction: "Downstream",
                        minPathLength: 0,
                        maxPathLength: 5
                    },
                    {
                        sourceId: 999,
                        targetId: 1000,
                        direction: "Downstream",
                        minPathLength: 1,
                        maxPathLength: 1
                    }
                ]
            }
        },
        {
            name: "Related Tickets",
            key: "RWP",
            data: {
                nodes: [
                    {
                        nodeId: 1000,
                        isOutput: true,
                        optional: false,
                        filters: {
                            filters: [{
                                filterId: i++,
                                operator: { key: "or", name: "OR" },
                                filters: [
                                    {
                                        filterId: i++,
                                        isNot: false,
                                        filterType: { key: "Type", name: "Type" },
                                        relation: { key: "eq", name: "=" },
                                        value: { key: "BUG", name: "Defect" }
                                    }
                                ]
                            }],
                            operator: { key: "or", name: "OR" }
                        }
                    }
                ],
                edges: [
                    {
                        sourceId: null,
                        targetId: 1000,
                        direction: "Downstream",
                        minPathLength: 0,
                        maxPathLength: 8
                    }
                ]
            }
        },
        {
            name: "Involved Users",
            key: "IU",
            data: {
                nodes: [
                    {
                        nodeId: 999,
                        isOutput: false,
                        optional: false,
                        filters: {
                            filters: [{
                                filterId: i++,
                                operator: { key: "or", name: "OR" },
                                filters: [
                                    {
                                        filterId: i++,
                                        isNot: false,
                                        filterType: { key: "Type", name: "Type" },
                                        relation: { key: "eq", name: "=" },
                                        value: { key: "BUG", name: "Defect" }
                                    }
                                ]
                            }],
                            operator: { key: "or", name: "OR" }
                        }
                    },
                    {
                        nodeId: 1000,
                        isOutput: true,
                        optional: false,
                        filters: {
                            filters: [{
                                filterId: i++,
                                operator: { key: "or", name: "OR" },
                                filters: [
                                    {
                                        filterId: i++,
                                        isNot: false,
                                        filterType: { key: "Type", name: "Type" },
                                        relation: { key: "eq", name: "=" },
                                        value: { key: "USER", name: "User" }
                                    }
                                ]
                            }],
                            operator: { key: "or", name: "OR" }
                        }
                    }
                ],
                edges: [
                    {
                        sourceId: null,
                        targetId: 999,
                        direction: "Downstream",
                        minPathLength: 0,
                        maxPathLength: 5
                    },
                    {
                        sourceId: 999,
                        targetId: 1000,
                        direction: "All",
                        minPathLength: 1,
                        maxPathLength: 1
                    }
                ]
            }
        }
    ];
};
