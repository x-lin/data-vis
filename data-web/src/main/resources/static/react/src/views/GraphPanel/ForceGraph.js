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
            links: {}
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
        this.updateGraph(Object.assign({}, this.props.graph));
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
            .append('svg:g')
            .attr("id", "gAll");

        svg.call(this.createOnZoomBehavior(vis));

        this.state.links = vis.selectAll(".link");
        this.state.nodes = vis.selectAll(".node");

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
        this.setVisibilityByFilter(data);
        this.updateGraphData(data);
        this.addLinks();
        this.addNodes();
        this.setNodeBehavior();

        //d3.selectAll(".g")
        //    .attr("title", function(d) {console.log("my title " + d.key); return d.key})
        //    .attr("data-content", function(d) {return "Some content to " + d.key})
        //    .attr("data-toggle", "popover");
        //
        //$(".g").popover({
        //    'trigger':'hover'
        //    ,'container': 'body'
        //    ,'placement': 'right'
        //    ,'white-space': 'nowrap'
        //    ,'html':'true'
        //    ,'viewport': "#gAll"
        //});

        this.cleanUpAndRestartLayout();
    }

    setViewport(e) {
        console.log("e", e);
        console.log(e[0].id);
        console.log("this", this);

        return e[0];
    }

    updateGraphData(data) {
        this.state.nodes = this.state.nodes.data(data.nodes);
        this.state.links = this.state.links.data(data.edges);
    }

    addLinks() {
        this.state.links.enter().insert("line", "g")
            .attr("class", "link ")

        this.state.links
            .attr("opacity", (d) => { return d.visible ? "1" : "0.1"});
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
            .attr("id", (d) => { return "g" + d.key;})
            .style("fill", (d) => this.determineNodeColor(d));

        g.append("circle")
            .attr("class", "circle")
            .attr("r", 20);

        this.addNodeText(g);

        this.state.nodes
                    .attr("opacity", (d) => { return d.visible ? "1" : "0.4"});
    }

    addNodeText(g) {
        g.append("text")
            .attr("class", "force-text  unselectable")
            .text(function (d) {return d.key;});
    }

    setNodeBehavior() {
        this.state.nodes
            .on("dblclick", (d) => this.searchForNeighbors(d))
            .on("contextmenu", function(d) {
                d3.event.preventDefault();
                console.log("contextmenu triggered");
            })
            .call(
                this.state.force.drag().on("dragstart", this.setElementToFixed)
            );
    }

    cleanUpAndRestartLayout() {
        this.state.nodes.exit().remove();
        this.state.links.exit().remove();
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
        var ticksPerRender = 50;

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
        for (var i = 0; i < ticksPerRender/10; i++) {
            for(var j = 0; j < 10; j++) {
                this.state.force.tick();
            }
            if(!(this.state.force.alpha() > 0)) {
                break;
            }
        }
    }

    animateIfNotFinished(requestAnimationFrame, ticksPerRender) {
        if (this.state.force.alpha() > 0) {
            requestAnimationFrame(() => {
                this.createAnimation(requestAnimationFrame, ticksPerRender);
            });
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