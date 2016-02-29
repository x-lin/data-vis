import Comparisons from "../Comparisons";

"use strict";

export default class {
    constructor(nodes, edges, edgeIndex, nodeIndex) {
        this.nodes = nodes ? nodes : [];
        this.edges = edges ? edges : [];
        this._edgeIndex = edgeIndex ? edgeIndex : {};
        this._nodeIndex = nodeIndex ? nodeIndex : {};
    }

    addNodes(nodes) {
        nodes.forEach((node) => {
            this.addNode(node);
        });
    }

    addEdges(edges) {
        edges.forEach((edge) => {
            this.addEdge(edge);
        });
    }

    addNode(node) {
        const savedNode = this.getNodeByKey(node.key);

        if(!savedNode) {

            this.nodes.push(node);
            const index = this.nodes.length - 1;
            this._nodeIndex[node.key] = [index, node];
            return this.nodes.length - 1;
        } else {
            return savedNode[0];
        }
    }

    addEdge(edge) {
        if(!this.edgeExists(edge.source, edge.target)) {
            this.edges.push(edge);
            this._edgeIndex[edge.source] = this._edgeIndex[edge.source] || [];
            this._edgeIndex[edge.source].push(edge.target);
        }
    }

    getNodeByKey(key) {
        return this._nodeIndex[key];
    }

    edgeExists(source, target) {
        const sString = source + "";
        const tString = target + "";

        if(this._edgeIndex[sString] && this._edgeIndex[sString].indexOf(target) !== -1) {
            return true;
        } else if(this._edgeIndex[tString] && this._edgeIndex[tString].indexOf(source) !== -1) {
            return true;
        } else {
            return false;
        }
    }
}