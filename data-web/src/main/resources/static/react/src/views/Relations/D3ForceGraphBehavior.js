import React from "react";

import d3 from "d3";
import Constants from "../../config/Constants";
import "./D3ForceGraph.css";

import Settings from "../../config/Settings";
import { indexOfObjectInArrayByProperty } from "../../utils/SearchHelpers";
import { ADD_TO_GRAPH_ON_SEARCH } from "../../actions/action-creators/SettingsActions"

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            force: {},
            node: {},
            link: {}
        }
    };

    componentDidMount() {
        this.renderGraph(this.props.graph, this.props.divId);
        window.addEventListener('resize', this.resizePanel.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizePanel);
    }

    componentDidUpdate() {

        if(this.props.graph.rerender) {
            this.renderGraph(this.props.graph, this.props.divId);
        } else {
            this.updateGraph(this.props.graph);
            this.state.force.start();
        }
        //const index = indexOfObjectInArrayByProperty(this.props.settings, ADD_TO_GRAPH_ON_SEARCH, "name");
        ////TODO fix this; find another way to determine, if to re-render or restart, otherwise some bad errors occur
        //if(!this.props.settings[index].value) {
        //
        //} else {
        //
        //}
    }

    renderGraph(data, divId) {
        if(!document.getElementById(divId)) {
            return;
        }

        const width = this.getWidth(divId);
        const height = this.getHeight(divId);

        this.dismissSvg(divId);

        this.createSvg(divId, width, height);
        this.state.force = this.setForceLayout(data, width, height);

        this.updateGraph(data);
    };

    dismissSvg(elementId) {
        d3.select("#" + elementId).select("svg").remove();
    };

    createSvg(divId, width, height) {
        const svg = d3.select("#" + divId).append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "force-graph");

        const vis = svg
            .append('svg:g');

        svg.call(this.createOnZoomBehavior(vis));

        this.state.link = vis.selectAll(".link");
        this.state.node = vis.selectAll(".node");

        return svg;
    }

    createOnZoomBehavior(panelElement) {
        return d3.behavior.zoom().scaleExtent([0.3, 8])
            .on("zoom", () => {
                panelElement.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
            });
    }
    
    getWidth(elementId) {
        return document.getElementById(elementId).clientWidth;
    }

    getHeight(elementId) {
        return document.getElementById(elementId).clientHeight;
    }

    setForceLayout(data, width, height) {
        return d3.layout.force()
            .charge(-500)
            .linkDistance(50)
            //.chargeDistance(300)
            //.friction(0.5)
            //.gravity(0.2)
            .size([width, height])
            .nodes(data.nodes)
            .links(data.edges)
            .on('start', () => {
                var ticksPerRender = 10;

                requestAnimationFrame(() => {
                    this.speedupAnimation(requestAnimationFrame, ticksPerRender);
                });
            });
    }

    speedupAnimation(requestAnimationFrame, ticksPerRender) {
        const { link, node, force } = this.state;

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
            requestAnimationFrame(() => {
                this.speedupAnimation(requestAnimationFrame, ticksPerRender);
            });
        }
    }

    updateGraph(data) {
        this.state.link = this.state.link.data(data.edges);
        this.state.node = this.state.node.data(data.nodes);

        const { force, node, link } = this.state;

        link.enter().insert("line", "g")
            .attr("class", "link");

        var g = node.enter().append("g")
            .attr("class", "g")
            .style("fill", (d) => this.calculateNodeColor(d));

        g.append("circle")
            .attr("class", "circle")
            .attr("r", 20);

        g.append("text")
            .attr("class", "force-text  unselectable")
            .text(function (d) {return d.key;});

        node
            .on("dblclick", (d) => this.searchForNeighbors(d))
            .call(
                force.drag().on("dragstart", this.setElementToFixed)
            );

        node.exit().remove();
        force.start();
    }
    
    calculateNodeColor(d){
        return Constants.colorMap[d.category] ? Constants.colorMap[d.category] : Constants.colorMap["Other"];
    }

    resizePanel(e) {
        if (document.getElementById(this.props.divId)) {
            const width = this.getWidth(this.props.divId);
            const height = this.getHeight(this.props.divId);

            this.state.force.size([width, height]).resume();
            d3.select("#" + this.props.divId).select("svg")
                .attr("width", width)
                .attr("height", height);
        }
    }

    searchForNeighbors(d) {
        d3.event.stopPropagation();
        this.props.searchNeighbors(d.category, d.key, false);
    };

    setElementToFixed(d) {
        d3.event.sourceEvent.stopPropagation();
        d3.select(this).classed("fixed", d.fixed = true);
    }

    render() {
        return (
            <div id={this.props.divId}>
            </div>
        );
    };
}