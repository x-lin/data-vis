import React from "react";
import d3 from "d3";

import Constants from "../../config/Constants";
import FilterHelpers from "../../utils/FilterHelpers";
import "./Schema.css";
import D3Utils from "../../utils/D3Utils";
import DOMSelector from "../../utils/DOMSelector";
import EventHandlers from "./SchemaEventHandlers";

import cola from "webcola";

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
            selector: "#schema",
            nodeCount: 0
        }
    }

    render() {
        return (
            <div id="schema">
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
        this.state.zoom = D3Utils.createZoom(this.state.scale, this.state.translate);
        this.updateGraph(data);
    }

    updateGraph(data) {
        this.saveZoom();
        this.dismissOldSvg();
        this.createSvg();
        this.updateGraphData(data);
        this.setVisibilityByFilter(data);
        this.addNodes();
        this.addLinks();
        this.updateForceLayout(data);
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
        d3.select(this.state.selector).select("svg").remove();
    };

    createSvg() {
        const svg = D3Utils.createSvg(this.state.selector)
            .attr("class", "schemaClass")
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
            .size([DOMSelector.getWidth(this.state.selector), DOMSelector.getHeight(this.state.selector)])
            .on("start", () => this.createSpeededUpAnimation());

        //this.state.force = cola.d3adaptor()
        //    .linkDistance(150)
        //    .nodes(data.nodes)
        //    .links(data.edges)
        //
        //    .avoidOverlaps(true)
        //    .size([DOMSelector.getWidth(this.state.selector), DOMSelector.getHeight(this.state.selector)])
        //    .on("start", () => this.createSpeededUpAnimation());
    }

    updateGraphData(data) {
        this.state.nodes = this.state.nodes.data(data.nodes);
        this.state.links = this.state.links.data(data.edges);
    }

    addLinks() {
        this.state.links.enter().insert("line", "g")
            .attr("class", "link");

        const MIN_SIZE = 1;
        const MAX_SIZE = 100;

        this.state.links
            .attr("opacity", (d) => { return d.visible ? "1" : this.props.disabledOpacity})
            .attr("stroke-width", (d) => {
                const size = (d.count / d.total) *  MAX_SIZE * d.total/this.state.nodeCount;
                return size < MIN_SIZE ? MIN_SIZE : size;
            })
            .attr("stroke", d => Constants.getColor(d.edgeType));
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
                return Constants.getColor(d.name)
            });



        const MIN_SIZE = 5;
        const MAX_SIZE = 100;

        g.append("circle")
            .attr("class", "circle")
            .attr("r", (d) => {
                this.state.nodeCount = d.total;
                const size = (d.count / d.total) *  MAX_SIZE;
                return size < MIN_SIZE ? MIN_SIZE : size;
            })
            //.attr("id", (d) => { return ContextMenuBuilder.buildElementId(d.key, d.category);});

        this.addNodeText(g);

        this.state.nodes
            .attr("opacity", (d) => { return d.visible ? "1" : this.props.disabledOpacity;});

        this.setNodeBehavior();
    }

    addNodeText(g) {
        const MAX_TEXT_LENGTH = 8;

        g.append("text")
            .attr("class", "force-text  unselectable")
            .text(d =>  {
                //const name = d.name.length > MAX_TEXT_LENGTH ? d.name.substring(0, MAX_TEXT_LENGTH) + "..." : d.name;
                return `${d.name} (${d.key})`
                //return "";
            });
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
        const { selector } = this.state;

        if ($(selector)) {
            const width = DOMSelector.getWidth(selector);
            const height = DOMSelector.getHeight(selector);

            this.state.force.size([width, height]).resume();
            d3.select(selector).select("svg")
                .attr("width", width)
                .attr("height", height);
        }
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
        D3Utils.moveLinks(this.state.links);
        D3Utils.moveNodes(this.state.nodes);
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
                d.fixed = this.props.isFixed ? true : d.isFixed;
            });
        }
    }
}