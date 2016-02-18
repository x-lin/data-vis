import React from "react";
import { connect } from "react-redux";

import d3 from "d3";
import { colorMap } from "../../config/Constants";
import "./D3ForceGraph.css";

import { getNeighbors } from "../../actions/AJAXActions/GETNeighbors";

class D3ForceGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            force: {},
            node: {},
            link: {}
        }
    };

    componentDidMount() {
        this.renderD3(this.props.graph, null, null, this.props.divId);
    }

    componentDidUpdate() {
        this.restart(this.props.graph);
        this.state.force.start();
    }

    renderD3(graph, width, height, divId) {
        if(!document.getElementById(divId)) {
            return;
        }

        var width = document.getElementById(divId).clientWidth;
        var height = document.getElementById(divId).clientHeight;

        const data = Object.assign({}, graph);

        d3.select("#" + divId).select("svg").remove();

        var svg = d3.select("#" + divId).append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "force-graph")
            .attr("cursor", "move")
            .call(d3.behavior.zoom().scaleExtent([0.3, 8])
                .on("zoom", () => {
                    vis.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
                }));

        var vis = svg
            .append('svg:g');

        this.state.link = vis.selectAll(".link");
        this.state.node = vis.selectAll(".node");

        var thiz = this.state;
        this.state.force = d3.layout.force()
            .charge(-500)
            .linkDistance(50)
            //.gravity(0.2)
            .size([width, height])
            .nodes(data.nodes)
            .links(data.edges)
            .on('start', () => {
                var ticksPerRender = 10;
                var that = thiz;

                requestAnimationFrame(function render() {
                    for (var i = 0; i < ticksPerRender; i++) {
                        that.force.tick();
                    }

                    that.link
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

                    that.node.attr("transform", function (d) {
                        return "translate(" + d.x + "," + d.y + ")"
                    });

                    if (that.force.alpha() > 0) {
                        requestAnimationFrame(render);
                    }
                })
            });

        this.restart(data);
    };

    restart(data) {
        const thiz = this.state;

        thiz.link = thiz.link.data(data.edges);
        thiz.link.enter().insert("line", "g")
            .attr("class", "link");

        thiz.node = thiz.node.data(data.nodes);
        var g = thiz.node.enter().append("g")
            .attr("class", "g")
            .style("fill", function (d) {return colorMap[d.category] ? colorMap[d.category] : colorMap["Other"];});

        g.append("circle")
            .attr("class", "circle")
            .attr("r", 20);

        g.append("text")
            .attr("class", "force-text unselectable")
            .text(function (d) {return d.key;});

        thiz.node
            .on("dblclick", (d) => {
                d3.event.stopPropagation();
                this.props.searchNeighbors(d.category, d.key);
            })
            .call(thiz.force.drag()
                .on("dragstart", function(d) {
                    d3.event.sourceEvent.stopPropagation();
                    d3.select(this).classed("fixed", d.fixed = true);
                }));

        thiz.node.exit().remove();
        thiz.force.start();
    };

    render() {
        return (
            <div id={this.props.divId}></div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        graph: state.graph
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        searchNeighbors: (category, key) => {
            dispatch(getNeighbors(category, key));
        }
    };
};

const D3ForceGraphConnect = connect(
    mapStateToProps,
    mapDispatchProps
)(D3ForceGraph);

export default D3ForceGraphConnect;