export default class {
    constructor(nodes, edges, legend) {
        this.nodes = nodes ? nodes : [];
        this.edges = edges ? edges : [];

        this.legend = legend ? legend : [];

        if(this.legend.length == 0 && nodes) {
            this.nodes.forEach((node) => {
                this.addNodeLegend(node);
            })
        }
    }

    addNode(node) {
        let index = this.indexOfNode(node.key);

        if(index === -1) {
            this.nodes.push(node);
            index = this.nodes.length - 1;
            this.addNodeLegend(node);
        }

        return index;
    }

    addEdge(edge) {
        if(!this.edgeExists(edge.source, edge.target)) {
            this.edges.push(edge);
        }
    }

    addNodeLegend(node) {
        if(!this.nodeLegendExists(node)) {
            this.legend.push(node.type ? node.type : node.category);
        }
    }

    indexOfNode(key) {
        for(let i = 0; i < this.nodes.length; i++) {
            if(this.nodes[i].key === key) {
                return i;
            }
        }

        return -1;
    }

    nodeLegendExists(node) {
        for(let i = 0; i < this.legend.length; i++) {
            if(node.type === this.legend[i]) {
                return true;
            }
        }

        return false;
    }

    edgeExists(inputSource, inputTarget) {
        const input = this.getCleansedSourceAndTarget(inputSource, inputTarget);

        for(let i = 0; i < this.edges.length; i++) {
            const edge = this.edges[i];
            const { source, target} = this.getCleansedSourceAndTarget(edge.source, edge.target);

            if(input.source === source && input.target === target) {
                return true;
            } else if(input.target === source && input.source === target) {
                return true;
            }
        }

        return false;
    }

    getCleansedSourceAndTarget(sourceInp, targetInp) {
        let source, target;

        if (this.isEdgeInit(sourceInp, targetInp)) {
            source = sourceInp.index;
            target = targetInp.index;
        } else {
            source = sourceInp;
            target = targetInp;
        }

        return {source, target};
    }

    isEdgeInit(source, target) {
        return typeof source.index !== "undefined" && target.index !== "undefined";
    }
}