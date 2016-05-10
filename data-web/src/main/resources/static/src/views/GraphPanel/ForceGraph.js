import React from "react";
import d3 from "d3";

import Constants from "../../config/Constants";
import ContextMenuBuilder from "./ContextMenu/ContextMenuBuilder";
import EventHandlers from "./ForceGraphEventHandlers";
import FilterHelpers from "../../utils/FilterHelpers";
import D3Utils from "../../utils/D3Utils";
import DOMSelector from "../../utils/DOMSelector";



// Note: This class is mostly a wrapper around the D3 force graph implementation enriched with some customized behaviors.
// A refactoring of the force graph was started to apply to the React way (check out ForceGraph_Ref.js), it was however
// abandoned due to apparent performance losses in graph rendering and the lack of reusability of D3 behaviors in React.
export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            force: {},
            nodes: {},
            links: {},
            svg: {},
            g: {},
            translate: [0, 0],
            scale: 1,
            zoom: {},
            selector: `#${this.props.divId}`,
            localG: {},
            linkedByIndex: {},
            toggle: 0
        };
    }

    componentDidMount() {
        this.renderGraph(Object.assign({}, this.props.graph));
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
        this.addLinks();
        this.addNodes();

        this.updateForceLayout(data);
        this.createConnectedIndex(data);
    }

    createConnectedIndex(data) {
        this.state.linkedByIndex = {};

        // Create an array logging what is connected to what
        for (let i = 0; i < data.nodes.length; i++) {
            this.state.linkedByIndex[`${i},${i}`] = 1;
        }
        data.edges.forEach((d) => {
            this.state.linkedByIndex[d.source.index + "," + d.target.index] = 1;
        });
    }

    connectedNodes(d, state, props, thiz) {
        function neighboring(a, b) {
            return state.linkedByIndex[`${a.index},${b.index}`];
        }

        if (d3.event.ctrlKey) {
            d = d3.select(thiz).node().__data__;
            state.nodes.style("opacity", (o) => {
                const visibleOpacity = o.visible ? 1 : props.disabledOpacity;
                return neighboring(d, o) | neighboring(o, d) ? visibleOpacity : 0.1;
            });
            state.links.style("opacity", (o) => {
                const visibleOpacity = o.visible ? 1 : props.disabledOpacity;
                return d.index === o.source.index | d.index === o.target.index ? visibleOpacity : 0.1;
            });
            // Reduce the op
            state.toggle = 1;
        } else if (state.toggle === 1) {
            // Put them back to opacity=1
            state.nodes.style("opacity", (d) => {
                return d.visible ? "1" : props.disabledOpacity;
            });
            state.links.style("opacity", (d) => {
                return d.visible ? "1" : props.disabledOpacity;
            });
            state.toggle = 0;
        }
    }

    saveZoom() {
        if (typeof this.state.zoom.scale === "function") {
            this.state.scale = this.state.zoom.scale();
            this.state.translate = this.state.zoom.translate();
        }
    }

    createOnZoomBehavior(panelElement) {
        // assign panelElement to be the element responsible for zooming
        this.state.zoom
            .on("zoom", () => EventHandlers.onZoomSvg(panelElement));

        // set zoom level to saved zoom level
        this.state.g
            .transition()
            .duration(0)
            .attr("transform", `translate(${this.state.zoom.translate()}) scale(${this.state.zoom.scale()})`);

        return this.state.zoom;
    }

    dismissOldSvg() {
        d3.select(this.state.selector).select("svg").remove();
    }

    createSvg() {
        const { selector } = this.state;

        const svg = D3Utils.createSvg(selector)
            .attr("class", "force-graph")
            .attr("id", "force-force")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("version", 1.1)
            .attr("xmlns", "http://www.w3.org/2000/svg");

        svg
            .on("click", (d) => EventHandlers.onClickSvg(d));

        const vis = svg
            .append("svg:g")
            .attr("id", "gAll");

        this.state.g = vis;
        svg.call(this.createOnZoomBehavior(vis));

        this.addMarkers(svg);

        this.state.links = vis.selectAll(".link");
        this.state.nodes = vis.selectAll(".node");

        return svg;
    }

    updateForceLayout() {
        this.state.nodes.exit().remove();
        this.state.links.exit().remove();
        this.state.force.start();
        this.addNeighborCount(this.state.localG);
    }

    createForceLayout(data) {
        this.state.force = d3.layout.force()
            .charge(-700)
            .linkDistance(70)
            .nodes(data.nodes)
            .links(data.edges)
            .size([DOMSelector.getWidth(this.state.selector), DOMSelector.getHeight(this.state.selector)])
            .on("start", () => this.createSpeededUpAnimation())
    }

    updateGraphData(data) {
        this.state.nodes = this.state.nodes.data(data.nodes);
        this.state.links = this.state.links.data(data.edges);
    }

    addLinks() {
        this.state.links
            .enter()
            .insert("line", "g")
            .attr("class", "link ");

        this.state.links
            .attr("stroke", "#999")
            .attr("opacity", (d) => { return d.visible ? "1" : this.props.disabledOpacity});

        if(this.props.showEdgeDirection) {
            this.state.links
                .style("marker-start", (d) => {
                    return d.direction === "DOWNSTREAM" || d.direction === null ? "url(#marker-start)" : "";
                })
                .style("marker-end", (d) => {
                    return d.direction === "UPSTREAM" || d.direction === null ? "url(#marker-end)" : "";
                });
        }

    }

    setVisibilityByFilter(data) {
        const filters = FilterHelpers.getKeysMatching(this.props.visibilityFilters, false);
        const filterIndexValues = FilterHelpers.getIndicesByProperty(data.nodes, "category", filters);

        data.nodes = data.nodes.map((node, index) => {
            node.visible = (filterIndexValues.indexOf(index) === -1);

            return node;
        });

        data.edges = data.edges.map((edge) => {
            const connectedToFilter = (filterIndexValues.indexOf(edge.source.index) > -1) ||
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
                return Constants.getColor(d.type ? d.type : d.category)
            });



        g.append("circle")
            .attr("class", "circle")
            .attr("stroke", "#FFF")
            .attr("stroke-width", 1.5)
            .attr("r", 20)
            .attr("id", (d) => { return ContextMenuBuilder.buildElementId(d.key, d.category);});

        this.state.localG = g;

        this.addNodeText(g);

        this.state.nodes
            .attr("opacity", (d) => { return d.visible ? "1" : this.props.disabledOpacity;});

        this.setNodeBehavior();
    }

    addNeighborCount(g) {
        const padding = 2;

        const g1 = g.append("g")
            .attr("transform", "translate(11,14)")
            .style("fill", d => Constants.getColor(d.type ? d.type : d.category));

        g1.append("text")
            .attr("class", "unselectable")
            .attr("fill", "white")
            .attr("text-anchor", "middle")
            .style("font", "6px sans-serif")
            .text((d) => {
                const count = d.count - (parseInt(d.weight, 10) || 0);

                return (count && count > 0) ? `+${count}` : "";
            })
            .call(this.getTextBox);



        g1.insert("rect", "text")
            .attr("x", d => d.bbox.x - padding)
            .attr("y", d => d.bbox.y - padding)
            .attr("width", d => d.bbox.width + (d.bbox.width ? padding * 2 : 0))
            .attr("height", d => d.bbox.height + (d.bbox.height ? padding * 2 : 0))
            .attr("rx", 3)
            .attr("ry", 3)
            .style("font", "9px sans-serif")
            .attr("text-anchor", "middle")
            .style("fill", d => Constants.getColor(d.type));
    }

    addNodeText(g) {
        g.append("text")
            .attr("class", "force-text  unselectable")
            .style("font", "9px sans-serif")
            .attr("text-anchor", "middle")
            .style("fill", "black")
            .text(d => {
                return d.name.length > 25 ? d.name.substring(0, 25) + "..." : d.name;
            })
            .call(this.getTextBox);

        g.insert("rect","text")
            .attr("x", function(d){return d.bbox.x})
            .attr("y", function(d){return d.bbox.y})
            .attr("width", function(d){return d.bbox.width})
            .attr("height", function(d){return d.bbox.height})
            .attr("opacity", 0.5)
            .style("fill", "white");

    }

    getTextBox(selection) {
        selection.each(function(d) { d.bbox = this.getBBox(); })
    }

    setNodeBehavior() {
        const state = this.state;
        const props = this.props;
        const connectedNodes = this.connectedNodes;

        this.state.nodes
            .on("dblclick", (d, props) => {
                if (d.visible || this.props.enableFiltered) {
                    EventHandlers.onDoubleClickNode(d, this.props);
                }
            })
            .on("contextmenu", (d) => {
                if (d.visible || this.props.enableFiltered) {
                    EventHandlers.onContextMenuNode(d, this.props);
                }
            })
            .on("mouseover", (d) => {
                EventHandlers.onMouseOver(d);
            })
            .on("mouseleave", (d) => {
                EventHandlers.onMouseLeave(d);
            })
            .on("click", function(d) {
                connectedNodes(d, state, props, this);
            })
            .call(
                this.state.force.drag()
                    .on("dragstart", (d) => {
                        if (d.visible || this.props.enableFiltered) {
                            EventHandlers.onDragStartNode(d);
                        }
                    })
                    .on("drag", (d) => {
                        if (d.visible || this.props.enableFiltered) {
                            EventHandlers.onDragNode(d);
                        }
                    })
                    .on("dragend", (d) => {
                        if (d.visible || this.props.enableFiltered) {
                            EventHandlers.onDragEndNode(d);
                        }
                    })
            );
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
        for (let j = 0; j < ticksPerRender; j++) {
            this.state.force.tick();
        }
    }

    animateIfNotFinished(alphaThreshold) {
        if (this.state.force.alpha() > alphaThreshold) {
            this.createSpeededUpAnimation();
        } else {
            this.state.force.stop();

            this.state.nodes.attr("fixed", (d) => {
                if (!d.fixed) {
                    d.fixed = this.props.isFixed ? true : d.isFixed;
                }
            });
        }
    }

    addMarkers(svg) {
        const marker = svg.append("defs");

        marker
            .append("marker")
            .attr("id", "marker-start")
            .attr("viewBox", "-10 -5 10 10")
            .attr("refX", -44)
            .attr("refY", 0)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,5L10,0L0,5 L-10,0 L0, -5 Z")
            .style("fill", "#999");

        marker
            .append("marker")
            .attr("id", "marker-end")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 44)
            .attr("refY", 0)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,5L10,0L0,5 L10,0 L0, -5 Z")
            .style("fill", "#999");
    }

    render() {
        return (
            <div id={this.props.divId}>
            </div>
        );
    }
}