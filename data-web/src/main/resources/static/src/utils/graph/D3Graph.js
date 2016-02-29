export default class {
    constructor(nodes, edges) {
        this.nodes = nodes ? nodes : [];
        this.edges = edges ? edges : [];
    }

    addNode(node) {
        let index = this.indexOfNode(node.key);

        if(index === -1) {
            this.nodes.push(node);
            index = this.nodes.length - 1;
        }

        return index;
    }

    addEdge(edge) {
        if(!this.edgeExists(edge.source, edge.target)) {
            this.edges.push(edge);
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