import React from "react";
import d3 from "d3";

import Constants from "../../config/Constants";
import ContextMenuBuilder from "./ContextMenu/ContextMenuBuilder";
import EventHandlers from "./ForceGraphEventHandlers";
import FilterHelpers from "../../utils/FilterHelpers";
import "./ForceGraph.css";

//Note: This class is mostly a wrapper around the D3 force graph implementation enriched with some customized behaviors.
//A refactoring of the force graph was started to apply to the React way (check out ForceGraph_Ref.js), it was however
//abandoned due to apparent performance losses in graph rendering and the lack of reusability of D3 behaviors in React.
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
            zoom: {}
        }
    }

    render() {
        return (
            <div id={this.props.divId}>
            </div>
        );
    }

    componentDidMount() {
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
        this.createForceLayout(data);
        this.state.zoom = this.createZoom();
        this.updateGraph(data);
    }

    updateGraph(data) {
        this.saveZoom();
        this.dismissOldSvg();
        this.createSvg();
        this.updateGraphData(data);
        this.setVisibilityByFilter(data);
        this.addLinks();
        this.addNodes();
        this.updateForceLayout(data);
    }

    createZoom() {
        return d3.behavior
            .zoom()
            .scaleExtent([0.3, 8])
            .scale(this.state.scale)
            .translate(this.state.translate);
    }

    saveZoom() {
        if(typeof this.state.zoom.scale == 'function') {
            this.state.scale = this.state.zoom.scale();
            this.state.translate = this.state.zoom.translate();
        }
    }

    createOnZoomBehavior(panelElement) {
        //assign panelElement to be the element responsible for zooming
        this.state.zoom
            .on("zoom", (element) => EventHandlers.onZoomSvg(panelElement));

        //set zoom level to saved zoom level
        this.state.g
            .transition()
            .duration(0)
            .attr('transform', 'translate(' + this.state.zoom.translate() + ') scale(' + this.state.zoom.scale() + ')');

        return this.state.zoom;
    }

    dismissOldSvg() {
        d3.select("#" + this.props.divId).select("svg").remove();
    };

    createSvg() {
        const svg = d3.select("#" + this.props.divId).append("svg")
            .attr("width", this.getWidth())
            .attr("height", this.getHeight())
            .attr("class", "force-graph")
            .on("click", (d) => EventHandlers.onClickSvg(d));

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
            .attr("opacity", (d) => { return d.visible ? "1" : this.props.disabledOpacity});
    }

    setVisibilityByFilter(data) {
        const filters = FilterHelpers.getKeysMatching(this.props.visibilityFilters, false);
        const filterIndexValues = FilterHelpers.getIndicesByProperty(data.nodes, "category", filters);

        data.nodes = data.nodes.map((node, index) => {
            node.visible = (filterIndexValues.indexOf(index) === -1);

            return node;
        });

        data.edges = data.edges.map((edge, index) => {
            const connectedToFilter =  (filterIndexValues.indexOf(edge.source.index) > -1) ||
                (filterIndexValues.indexOf(edge.target.index) > -1) ||
                (filterIndexValues.indexOf(edge.source) > -1) ||
                (filterIndexValues.indexOf(edge.target) > -1);
            edge.visible = !connectedToFilter;

            return edge;
        });
    }

    addNodes() {
        const g = this.state.nodes.enter().append("g")
            .attr("class", "g")
            .style("fill", (d) => {


                return Constants.getColor(d.category)
            });

        g.append("circle")
            .attr("class", "circle")
            .attr("r", 20)
            .attr("id", (d) => { return ContextMenuBuilder.buildElementId(d.key, d.category);});

        this.addNodeText(g);

        this.state.nodes
            .attr("opacity", (d) => { return d.visible ? "1" : this.props.disabledOpacity;});

        this.setNodeBehavior();
    }

    addNodeText(g) {
        g.append("text")
            .attr("class", "force-text  unselectable")
            .text(d => d.key);
    }

    setNodeBehavior() {
        this.state.nodes
            .on("dblclick", (d, props) => {
                if((this.props.disableFiltered && d.visible) || !this.props.disableFiltered) {
                    EventHandlers.onDoubleClickNode(d, this.props);
                }
            })
            .on("contextmenu", (d) => {
                if(this.props.showContextMenu && ((this.props.disableFiltered && d.visible) || !this.props.disableFiltered)) {
                    EventHandlers.onContextMenuNode(d);
                }
            })
            .call(
                this.state.force.drag()
                    .on("dragstart", (d) => {
                        if((this.props.disableFiltered && d.visible) || !this.props.disableFiltered) {
                            EventHandlers.onDragStartNode(d);
                        }
                    })
            );
    }

    resizePanel(e) {
        if ($("#" + this.props.divId)) {
            const width = this.getWidth();
            const height = this.getHeight();

            this.state.force.size([width, height]).resume();
            d3.select("#" + this.props.divId).select("svg")
                .attr("width", width)
                .attr("height", height);
        }
    }

    getWidth() {
        return $("#"+this.props.divId).width();
    }

    getHeight() {
        return $("#"+this.props.divId).height();
    }

    createSpeededUpAnimation() {
        requestAnimationFrame(() => {
            this.createAnimation();
        });
    }

    createAnimation() {
        const TICKS_PER_RENDER = 10;
        const ALPHA_THRESHOLD = 0.03;

        this.passOverTicks(TICKS_PER_RENDER);
        this.moveLinks();
        this.moveNodes();
        this.animateIfNotFinished(ALPHA_THRESHOLD);
    }

    passOverTicks(ticksPerRender) {
        for(var j = 0; j < ticksPerRender; j++) {
            this.state.force.tick();
        }
    }

    animateIfNotFinished(alphaThreshold) {
        if (this.state.force.alpha() > alphaThreshold) {
            this.createSpeededUpAnimation();
        } else {
            this.state.force.stop();

            this.state.nodes.attr("fixed", (d) => {
                d.fixed = this.props.isFixed ? true : !!(d.isFixed);
            });
        }
    }

    moveLinks() {
        this.state.links
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
    }

    moveNodes() {
        this.state.nodes
            .attr("transform", d => `translate(${d.x},${d.y})`);
    }
}