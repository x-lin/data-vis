import React from "react";

import d3 from "d3";

import { colorMap } from "../../config/Constants";
import "./D3ForceGraph.css";

class D3ForceGraph extends React.Component {
    componentDidMount() {
        this.renderD3(null, null, null, this.props.divId);
    }

    renderD3(data, width, height, divId) {
        var width = document.getElementById(divId).clientWidth;
        var height = document.getElementById(divId).clientHeight;

        var data = {
            nodes: [{key: "ACE-1", group: "Project"}],
            edges: []
        }

        /////////////////////////////////////////////////////////////////

        d3.select("#" + divId).select("svg").remove();

        var svg = d3.select("#d3box").append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "force-graph")
            .attr("cursor", "move")
            .call(d3.behavior.zoom().scaleExtent([0.3, 8]).on("zoom", zoom));

        var vis = svg
            .append('svg:g');

        function zoom() {
            vis.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
        }

        //currentSvg = svg;

        var force = d3.layout.force()
            .charge(-500)
            .linkDistance(50)
            //.gravity(0.2)
            .size([width, height])
            .nodes(data.nodes)
            .links(data.edges)
            .on('start', animation);

        //define drag events
        var drag = force.drag()
            .on("dragstart", dragstart)
        //.on("drag", dragmove);

        var link = vis.selectAll(".link");
        var node = vis.selectAll(".node");

        var restart = function (data) {
            link = link.data(data.edges);
            link.enter().insert("line", "g")
                .attr("class", "link");

            node = node.data(data.nodes);
            var g = node.enter().append("g")
                .attr("class", "g")
                .style("fill", function (d) {
                    return colorMap[d.group] ? colorMap[d.group] : colorMap["Other"];
                })
            //.attr("uib-popover", function(d) {
            //    return d.key;
            //})
            //.attr("popover-trigger", "outsideClick")
            //.attr("popover-append-to-body", "true")
            //.attr("uib-popover-template", "dynamicPopover.templateUrl")
            //.attr("popover-title", "{{dynamicPopover.title}}")
                ;

            g.append("circle")
                .attr("class", "circle")
                .attr("r", 10);

            g.append("text")
                .attr("class", "force-text unselectable")
                .text(function (d) {
                    return d.key;
                })
                //.call(function () {
                //    $compile($("#d3box"))(scope);
                //});

            node
                .on("click", mouseclick)
                .on("contextmenu", rightclick)
                .on("dblclick", doubleclick)
                .call(drag)

            node.exit().remove();

            force.start();
        }

        restart(data);

        //fix position of node after dragged by user
        function dragstart(d) {
            d3.event.sourceEvent.stopPropagation();
            d3.select(this).classed("fixed", d.fixed = true);
        }

        function mouseclick(d) {
            d3.event.stopPropagation();
        }

        function rightclick(d) {
            //d3.event.preventDefault();
        }

        function doubleclick(d) {
            d3.event.stopPropagation();
            //TODO to re-implement
            //scope.getNeighbors(d.group, d.key).then(function (d1) {
            //    data = D3Utility.updateDataWithNodes(data, d1, d.index);
            //
            //    restart(data);
            //
            //    force.start();
            //});
        }

        //speed up animation by 10
        function animation() {
            var ticksPerRender = 10;
            requestAnimationFrame(function render() {
                for (var i = 0; i < ticksPerRender; i++) {
                    force.tick();
                }

                link
                    .attr('x1', function (d) {
                        return d.source.x;
                    })
                    .attr('y1', function (d) {
                        return d.source.y;
                    })
                    .attr('x2', function (d) {
                        return d.target.x;
                    })
                    .attr('y2', function (d) {
                        return d.target.y;
                    });

                node.attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")"
                });

                if (force.alpha() > 0) {
                    requestAnimationFrame(render);
                }
            })
        }

        //currentGraph = force;
    };

    render() {
        return (
            <div id={this.props.divId}></div>
        );
    };
}

export default D3ForceGraph;