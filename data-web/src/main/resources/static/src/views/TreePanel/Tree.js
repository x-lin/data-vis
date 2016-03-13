import React from "react";
import d3 from "d3";

import Constants from "../../config/Constants";
import FilterHelpers from "../../utils/FilterHelpers";
import D3Utils from "../../utils/D3Utils";
import DOMSelector from "../../utils/DOMSelector";
import "./Tree.css";

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            force: {},
            nodes: {},
            links: {},
            g: {},
            translate: [0,0],
            scale: 1,
            zoom: {},
            selector: "#test"
        }
    }

    render() {
        return (
            <div id="test">
            </div>
        );
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizePanel);
    }

    componentDidMount() {
        window.addEventListener('resize', (event) => this.resizePanel(event));
        //this.state.zoom = this.createZoom();

        var margin = {top: 20, right: 100, bottom: 20, left: 100};

        const {selector} = this.state;
        const width = DOMSelector.getWidth(selector);
        const height = DOMSelector.getHeight(selector);

        var i = 0,
            duration = 750,
            root;
        var tree = d3.layout.tree()
            .size([height, width]);

        var diagonal = d3.svg.diagonal()
            .projection(function(d) { return [d.y, d.x]; });

        var svg = D3Utils.createSvg("#test")
            .attr("class", "tree")
            .call( D3Utils.createZoom().on("zoom", zoom));

        var g = svg
            .append("svg:g")
            //create space
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        function zoom() {
            //TODO add margin
            g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }

        d3.json("data.json", function(error, flare) {
            if (error) throw error;

            root = flare;
            root.x0 = height / 2;
            root.y0 = 0;

            function collapse(d) {
                if (d.children) {
                    d._children = d.children;
                    d._children.forEach(collapse);
                    d.children = null;
                }
            }

            root.children.forEach(collapse);
            update(root);
        });

        function update(source) {
            //var duration = d3.event && d3.event.altKey ? 5000 : 500;

            // compute the new height
            var levelWidth = [1];
            var childCount = function(level, n) {

                if(n.children && n.children.length > 0) {
                    if(levelWidth.length <= level + 1) levelWidth.push(0);

                    levelWidth[level+1] += n.children.length;
                    n.children.forEach(function(d) {
                        childCount(level + 1, d);
                    });
                }
            };
            childCount(0, root);
            var newHeight = d3.max(levelWidth) * 45; // 20 pixels per line
            tree = tree.size([newHeight, width]);

            // Compute the new tree layout.
            var nodes = tree.nodes(root).reverse(),
                links = tree.links(nodes);

            // fixes link length of node
            nodes.forEach(function(d) { d.y = d.depth * 180; });

            // Update the nodes…
            var node = g.selectAll("g.node")
                .data(nodes, function(d) { return d.id || (d.id = ++i); });

            // Enter any new nodes at the parent's previous position.
            const g1 = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                .on("click", click)
                .style("fill", (d) => {
                    return "#333333";
                });

            g1.append("circle")
                //.attr("class", "circle")
                .attr("r", 15);

            g1.append("text")
                .text(function(d) { return d.name; })

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

            nodeUpdate.select("circle")
                .attr("r", 15)
                .style("stroke", function(d) { return d._children ? "#333333" : "none"; })
                .style("fill", function(d) { return Constants.getColor(d.category)});

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
                .remove();

            nodeExit.select("circle")
                .attr("r", 15);

            nodeExit.select("text")
                .style("fill-opacity", 1e-6);

            // Update the links…
            var link = g.selectAll("path.link")
                .data(links, function(d) { return d.target.id; });

            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", function(d) {
                    var o = {x: source.x0, y: source.y0};
                    return diagonal({source: o, target: o});
                });

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function(d) {
                    var o = {x: source.x, y: source.y};
                    return diagonal({source: o, target: o});
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function(d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }

        // Toggle children on click.
        function click(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            update(d);
        }
    }

    resizePanel(e) {
        const { selector } = this.state;

        if ($(selector)) {
            const width = DOMSelector.getWidth(selector);
            const height = DOMSelector.getHeight(selector);
            //
            //this.state.force.size([width, height]).resume();
            d3.select(selector).select("svg")
                .attr("width", width)
                .attr("height", height);
        }
    }
}