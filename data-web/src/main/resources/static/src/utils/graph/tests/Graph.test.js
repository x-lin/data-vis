//import { expect } from "chai";
//
//import Graph from "../Graph";
//import Edge from "../Edge";
//import Node from "../Node";
//
//describe("Graph", () => {
//    const node1 = new Node("key1", "category1");
//    const node2 = new Node("key2", "category2");
//    const node3 = new Node("key3", "category3");
//
//    const edge1 = new Edge(1, 2);
//    const edge2 = new Edge(0, 2);
//
//    describe("constructor", () => {
//        it("should initialize an empty graph when called with no parameters", () => {
//            const graph = new Graph();
//
//            expect(graph).to.have.property("edges");
//            expect(graph.edges).to.have.lengthOf(0);
//            expect(graph).to.have.property("nodes");
//            expect(graph.nodes).to.have.lengthOf(0);
//        });
//
//        it("should initialize an empty graph when handed empty parameter arrays", () => {
//            const graph = new Graph([], []);
//
//            expect(graph).to.have.property("edges");
//            expect(graph.edges).to.have.lengthOf(0);
//            expect(graph).to.have.property("nodes");
//            expect(graph.nodes).to.have.lengthOf(0);
//        });
//    });
//
//    describe("addNode", () => {
//        it("should add a new node to the graph, if it doesn't exist", () => {
//            const graph = new Graph();
//            let index = graph.addNode(node1);
//
//            expect(index).to.be.equal(0);
//            expect(graph.nodes).to.have.lengthOf(1);
//
//            index = graph.addNode(node2);
//
//            expect(index).to.be.equal(1);
//            expect(graph.nodes).to.have.lengthOf(2);
//        });
//
//        it("should not add a new node to the graph, if it does exist", () => {
//            const graph = new Graph();
//            graph.addNode(node1);
//            graph.addNode(node3);
//            const indexBefore = graph.addNode(node2);
//            const lengthBefore = graph.nodes.length;
//            const indexAfter = graph.addNode(node2);
//
//            expect(lengthBefore).to.be.equal(graph.nodes.length);
//            expect(indexBefore).to.be.equal(indexAfter);
//        });
//    });
//
//    describe("addEdge", () => {
//        it("should add a new edge to the graph, if it doesn't exist", () => {
//            const graph = new Graph();
//            graph.addNode(node1);
//            graph.addNode(node2);
//            graph.addNode(node3);
//
//            graph.addEdge(edge1);
//            expect(graph.edges).to.have.lengthOf(1);
//            expect(graph.edgeExists(edge1.source, edge1.target)).to.be.true;
//
//            graph.addEdge(edge2);
//            expect(graph.edges).to.have.lengthOf(2);
//            expect(graph.edgeExists(edge2.source, edge2.target)).to.be.true;
//        });
//
//        it("should not add a new edge to the graph, if it does exist", () => {
//            const graph = new Graph();
//            graph.addNode(node1);
//            graph.addNode(node2);
//            graph.addNode(node3);
//
//            graph.addEdge(edge1);
//            expect(graph.edges).to.have.lengthOf(1);
//            expect(graph.edgeExists(edge1.source, edge1.target)).to.be.true;
//
//            graph.addEdge(edge1);
//            expect(graph.edges).to.have.lengthOf(1);
//        });
//    });
//
//    describe("getNodeByKey", () => {
//        it("should return undefined when a node is not in the graph", () => {
//            const graph = new Graph();
//
//            expect(graph.getNodeByKey(node1.key)).to.be.undefined;
//        });
//    });
//
//    describe("edgeExists", () => {
//        it("should return false when an edge is not in the graph", () => {
//            const graph = new Graph();
//
//            expect(graph.edgeExists(edge1.target, edge1.source)).to.be.false;
//        });
//
//        it("should return true, if an edge is in the graph", () => {
//            const graph = new Graph();
//            graph.addNode(node1);
//            graph.addNode(node2);
//            graph.addNode(node3);
//
//            expect(graph.edgeExists(edge1.source, edge1.target)).to.be.false;
//            graph.addEdge(edge1);
//            expect(graph.edgeExists(edge1.source, edge1.target)).to.be.true;
//        });
//
//        it("should check for both edge directions", () => {
//            const graph = new Graph();
//            graph.addNode(node1);
//            graph.addNode(node2);
//            graph.addNode(node3);
//
//            expect(graph.edgeExists(edge1.target, edge1.source)).to.be.false;
//            graph.addEdge(edge1);
//            expect(graph.edgeExists(edge1.target, edge1.source)).to.be.true;
//        });
//    });
//});
