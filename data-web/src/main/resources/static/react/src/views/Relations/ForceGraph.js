import React from "react";
import d3 from "d3";

import Constants from "../../config/Constants";
import "./ForceGraph.css";

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            force: {},
            node: {},
            link: {}
        }
    };

    render() {
        return (
            <div id={this.props.divId}>
            </div>
        );
    };

    componentDidMount() {
        this.renderGraph(this.props.graph);
        window.addEventListener('resize', this.resizePanel.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizePanel);
    }

    componentDidUpdate() {
        this.updateGraph(this.props.graph);
    }

    renderGraph(data) {
        this.dismissOldSvg();

        this.createSvg();
        this.createForceLayout(data);

        this.updateGraph(data);
    };

    dismissOldSvg() {
        d3.select("#" + this.props.divId).select("svg").remove();
    };

    createSvg() {
        const svg = d3.select("#" + this.props.divId).append("svg")
            .attr("width", this.getWidth())
            .attr("height", this.getHeight())
            .attr("class", "force-graph");

        const vis = svg
            .append('svg:g');

        svg.call(this.createOnZoomBehavior(vis));

        this.state.link = vis.selectAll(".link");
        this.state.node = vis.selectAll(".node");

        return svg;
    }

    createForceLayout(data) {
        this.state.force = d3.layout.force()
            .charge(-500)
            .linkDistance(50)
            //.chargeDistance(300)
            //.friction(0.5)
            //.gravity(0.2)
            .size([this.getWidth(), this.getHeight()])
            .nodes(data.nodes)
            .links(data.edges)
            .on('start', () => this.createSpeededUpAnimation());
    }

    updateGraph(data) {
        this.updateGraphData(data);
        this.addLinks();
        this.addNodes();
        this.setNodeBehavior();
        this.cleanUpAndRestartLayout();
    }

    updateGraphData(data) {
        this.state.link = this.state.link.data(data.edges);
        this.state.node = this.state.node.data(data.nodes);
    }

    addLinks() {
        this.state.link.enter().insert("line", "g")
            .attr("class", "link");
    }

    addNodes() {
        const g = this.state.node.enter().append("g")
            .attr("class", "g")
            .style("fill", (d) => this.determineNodeColor(d));

        g.append("circle")
            .attr("class", "circle")
            .attr("r", 20);

        this.addNodeText(g);
    }

    addNodeText(g) {
        g.append("text")
            .attr("class", "force-text  unselectable")
            .text(function (d) {return d.key;});
    }

    setNodeBehavior() {
        this.state.node
            .on("dblclick", (d) => this.searchForNeighbors(d))
            .call(
                this.state.force.drag().on("dragstart", this.setElementToFixed)
            );
    }

    cleanUpAndRestartLayout() {
        this.state.node.exit().remove();
        this.state.link.exit().remove();
        this.state.force.start();
    }

    createOnZoomBehavior(panelElement) {
        return d3.behavior.zoom().scaleExtent([0.3, 8])
            .on("zoom", () => {
                panelElement.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
            });
    }

    setElementToFixed(d) {
        d3.event.sourceEvent.stopPropagation();
        d3.select(this).classed("fixed", d.fixed = true);
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
    
    getWidth() {
        return document.getElementById(this.props.divId).clientWidth;
    }

    getHeight() {
        return document.getElementById(this.props.divId).clientHeight;
    }

    createSpeededUpAnimation() {
        var ticksPerRender = 10;

        requestAnimationFrame(() => {
            this.createAnimation(requestAnimationFrame, ticksPerRender);
        });
    }

    createAnimation(requestAnimationFrame, ticksPerRender) {
        this.passOverTicks(ticksPerRender);
        this.moveLinks();
        this.moveNodes();
        this.animateIfNotFinished(requestAnimationFrame, ticksPerRender);
    }

    passOverTicks(ticksPerRender) {
        for (var i = 0; i < ticksPerRender; i++) {
            this.state.force.tick();
        }
    }

    moveLinks() {
        this.state.link
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
    }

    moveNodes() {
        this.state.node.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")"
        });
    }

    animateIfNotFinished(requestAnimationFrame, ticksPerRender) {
        if (this.state.force.alpha() > 0) {
            requestAnimationFrame(() => {
                this.createAnimation(requestAnimationFrame, ticksPerRender);
            });
        }
    }
    
    determineNodeColor(d){
        const { colorMap } = Constants;
        return colorMap[d.category] ? colorMap[d.category] : colorMap["Other"];
    }

    searchForNeighbors(d) {
        d3.event.stopPropagation();
        this.props.searchNeighbors(d.category, d.key, false);
    };
}