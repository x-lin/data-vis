import React from "react";
import d3 from "d3";

import Constants from "../../config/Constants";
import FilterHelpers from "../../utils/FilterHelpers";
import "./ForceGraph.css";

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            force: {},
            nodes: {},
            links: {},
            g: {},
            translate: [0,0],
            scale: 1
        }
    };

    render() {
        return (
            <div id={this.props.divId}>
            </div>
        );
    };

    componentDidMount() {
        //const data = this.filterGraph(this.props.graph);
        this.renderGraph(Object.assign({}, this.props.graph));
        window.addEventListener('resize', (event) => this.resizePanel(event));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizePanel);
    }

    componentDidUpdate() {
        //this.renderGraph(Object.assign({}, this.props.graph));
        this.updateGraph(Object.assign({}, this.props.graph));
    }

    renderGraph(data) {
        this.createForceLayout(data);
        this.updateGraph(data);
    };

    updateGraph(data) {
        this.dismissOldSvg();
        this.createSvg();
        this.updateGraphData(data);
        this.setVisibilityByFilter(data);
        this.addLinks();
        this.addNodes();
        this.updateForceLayout(data);
    }

    dismissOldSvg() {
        d3.select("#" + this.props.divId).select("svg").remove();
    };

    createSvg() {
        const svg = d3.select("#" + this.props.divId).append("svg")
            .attr("width", this.getWidth())
            .attr("height", this.getHeight())
            .attr("class", "force-graph ")
            .on("click", (d) => {
                $('.popover').remove();
            });

        const vis = svg
            .append('svg:g')
            .attr("id", "gAll");

        this.state.g = vis;
        svg.call(this.createOnZoomBehavior(vis));

        this.state.links = vis.selectAll(".link");
        this.state.nodes = vis.selectAll(".node");

        return svg;
    }

    updateForceLayout() {
        this.state.nodes.exit().remove();
        this.state.links.exit().remove();
        this.state.force.start();
    }

    createForceLayout(data) {
        this.state.force = d3.layout.force()
            .charge(-500)
            //.chargeDistance(300)
            //.friction(0.5)
            //.gravity(0.2)
            .linkDistance(50)
            .nodes(data.nodes)
            .links(data.edges)
            .size([this.getWidth(), this.getHeight()])
            .on("start", () => this.createSpeededUpAnimation());
    }

    updateGraphData(data) {
        this.state.nodes = this.state.nodes.data(data.nodes);
        this.state.links = this.state.links.data(data.edges);
    }

    addLinks() {
        this.state.links.enter().insert("line", "g")
            .attr("class", "link");

        this.state.links
            .attr("opacity", (d) => { return d.visible ? "1" : "0.3"});
    }

    setVisibilityByFilter(data) {
        const filters = FilterHelpers.getKeysMatching(this.props.visibilityFilters, false);
        const filterIndexValues = FilterHelpers.getIndicesByProperty(data.nodes, "category", filters);

        //TODO performance can be improved
        data.nodes = data.nodes.map((node, index) => {
            node.visible = (filterIndexValues.indexOf(index) === -1);

            return node;
        });

        data.edges = data.edges.map((edge, index) => {
            const connectedToFilter =  (filterIndexValues.indexOf(edge.source.index) > -1) ||
                (filterIndexValues.indexOf(edge.target.index) > -1);
            edge.visible = !connectedToFilter;

            return edge;
        });
    }

    addNodes() {
        const g = this.state.nodes.enter().append("g")
            .attr("class", "g")
            .style("fill", (d) => this.determineNodeColor(d));

        g.append("circle")
            .attr("class", "circle")
            .attr("r", 20)
            .attr("id", (d) => { return this.buildIdName(d.key, d.category);})
            .attr("title", (d) => {
                return `<span style="background:${Constants.colorMap[d.category]}; width: 15px; height: 15px; border-radius: 50%; display: inline-block;"></span>
                    <span style="top: -2px; position: relative; ">${d.key}</span>`
            })
            .attr("data-toggle", "popover")
            .attr("data-content", d => d.key);

        this.addNodeText(g);

        this.state.nodes
            .attr("opacity", (d) => { return d.visible ? "1" : "0.4"});

        this.setNodeBehavior();
    }

    addNodeText(g) {
        g.append("text")
            .attr("class", "force-text unselectable")
            .text(function (d) {return d.key;});
    }

    buildIdName(key, category) {
        return "g" + key.replace(/^[^a-z]+|[^\w-]+/gi, "") + category;
    }

    setNodeBehavior() {
        this.state.nodes
            .on("dblclick", (d) => this.searchForNeighbors(d))
            .on("contextmenu", (d) => {
                d3.event.preventDefault();

                $("#" + this.buildIdName(d.key, d.category)).popover({
                    'trigger':'manual'
                    ,'container': 'body'
                    ,'placement': 'right'
                    ,'white-space': 'nowrap'
                    ,'html':'true'
                });

                $("#" + this.buildIdName(d.key, d.category)).popover("show");

                console.log("contextmenu triggered");
            })
            .call(
                this.state.force.drag().on("dragstart", this.setElementToFixed)
            );
    }

    createOnZoomBehavior(panelElement) {
        const zoom = d3.behavior
            .zoom()
            .scaleExtent([0.3, 8])
            .scale(this.state.scale)
            .translate(this.state.translate)
            .on("zoom", () => {
                $('.popover').remove();
                panelElement.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
                // TODO maybe call that only when new graph is about to be rendered?
                // TODO Explore that, when rendering starts to get inefficient
                this.state.translate = d3.event.translate;
                this.state.scale = d3.event.scale;
            });

        this.state.g.transition().duration(0).attr('transform', 'translate(' + zoom.translate() + ') scale(' + zoom.scale() + ')')

        return zoom;
    }

    setElementToFixed(d) {
        d3.event.sourceEvent.stopPropagation();
        $('.popover').remove();
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
        for(var j = 0; j < ticksPerRender; j++) {
            this.state.force.tick();
        }
    }

    animateIfNotFinished(requestAnimationFrame, ticksPerRender) {
        if (this.state.force.alpha() > 0.05) {
            requestAnimationFrame(() => {
                this.createAnimation(requestAnimationFrame, ticksPerRender);
            });
        } else {
            this.state.force.stop();
        }
    }

    moveLinks() {
        this.state.links
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
        this.state.nodes.attr("transform", function (d) {

            return "translate(" + d.x + "," + d.y + ")"
        });
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