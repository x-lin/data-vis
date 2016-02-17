var service = {};

/**
 * Connects the data between each entry of a data group and returns it in a
 * format suitable for force graphs. The function expects each entry to
 * contain a "key" attribute.
 *
 * @param dataGroups
 * @returns {{}}
 */
service.createD3ForGroupPair = function(data1, data2) {
    var group1 = data1.data;
    var group2 = data2.data;
    var nodes = [],
        edges = [],
        graph = {};

    for(var i = 0 ; i < group1.length; i++) {
        var node = {};
        node.key = group1[i].key;
        node.group = data1.group;
        nodes.push(node);
    }

    for(var j = 0; j < group2.length; j++) {
        var node = {};
        node.key = group2[j].key;
        node.group = data2.group;
        nodes.push(node);
    }

    for(i = 0; i < group1.length; i++) {
        for(j = 0; j < group2.length; j++) {
            var edge = {};
            //we know that group1 was initialized before group2, therefore we can use the length of the
            //group1 array to determine the placement of the element of group2
            edge.source = i;
            edge.target = j + group1.length;
            edges.push(edge);
        }
    }

    graph.edges = edges;
    graph.nodes = nodes;

    return graph;
};

service.addValueInKeyArray = function(map, key, value) {
    if(!map[key]) {
        map[key] = [];
    }

    if(map[key].indexOf(value) === -1) {
        map[key].push(value);
    }

    return map;
};

service.addMetadataNode = function(graph, index, value) {
    graph.nodeMap[value] = index;
    graph.nodeInverseMap[index] = value;

    return graph;
};

service.addMetadataEdge = function(graph, sourceIndex, targetIndex) {
    service.addValueInKeyArray(graph.edgeMap, sourceIndex, targetIndex);
    service.addValueInKeyArray(graph.edgeMap, targetIndex, sourceIndex);
};

service.createNode = function(keyName, groupName) {
    var node = {};
    node.key = keyName;
    node.group = groupName;

    return node;
};

service.createEdge = function(sourceIndex, targetIndex) {
    var edge = {};
    edge.source = sourceIndex;
    edge.target = targetIndex;

    return edge;
};

service.keyMap = {
    Project : "key",
    Issue : "key",
    User : "name",
    Requirement : "key"
};

service.createNeighborGraph = function(centralNode, neighbors) {
    var nodes = [],
        edges = [],
        graph = {};

    var keyMap = service.keyMap;

    graph.nodeMap = {};
    graph.nodeInverseMap = {};
    graph.edgeMap = {};

    var indexNeighbor = 1;
    var indexCentralNode = 0;

    var group = Object.keys(centralNode)[0];
    var node = service.createNode(centralNode[group][keyMap[group]], group);
    nodes.push(node);

    service.addMetadataNode(graph, indexCentralNode, node.key);

    //{key1: [...], key2: [...]}
    for(var key in neighbors) {
        for(var i = 0; i < neighbors[key].length; i++) {
            var keyName = keyMap[key];
            node = service.createNode(neighbors[key][i][keyName], key);
            nodes.push(node);

            var edge = service.createEdge(indexCentralNode, indexNeighbor);
            edges.push(edge);

            service.addMetadataNode(graph, indexNeighbor, node.key);
            service.addMetadataEdge(graph, edge.source, edge.target);

            indexNeighbor++;
        }
    }

    graph.edges = edges;
    graph.nodes = nodes;

    console.log(graph);

    return graph;
};

service.updateDataWithNodes = function(data, addData, index) {
    var keyMap = service.keyMap;

    console.log(data);

    for(var key in addData) {
        for(var i = 0; i < addData[key].length; i++) {
            var keyName = keyMap[key];
            var elementName = addData[key][i][keyName];

            if(typeof data.nodeMap[elementName] !== "undefined") {
                //element already exists in data
                var name = addData[key][i][keyName];
                var index2 = data.nodeMap[name];

                if(data.edgeMap[index2].indexOf(index) === -1) {
                    var edge = service.createEdge(index, index2);
                    data.edges.push(edge);

                    service.addMetadataEdge(data, edge.source, edge.target);
                } else {
                    //edge between nodes already exists...don't do anything
                }

            } else {
                //element does't exist...create and connect with index node
                var node = service.createNode(elementName, key);
                data.nodes.push(node);

                var index2 = data.nodes.length-1;

                var edge = service.createEdge(index, index2);
                data.edges.push(edge);

                service.addMetadataNode(data, index2, node.key);
                service.addMetadataEdge(data, edge.source, edge.target);
            }
        }
    }

    return data;
};

export default service;