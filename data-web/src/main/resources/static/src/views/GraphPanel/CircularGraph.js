import React from "react";
import d3 from "d3";
import cola from "webcola";

import Constants from "../../config/Constants";
import ContextMenuBuilder from "./ContextMenu/ContextMenuBuilder";
import EventHandlers from "./ForceGraphEventHandlers";
import FilterHelpers from "../../utils/FilterHelpers";
import "./ForceGraph.css";
import D3Utils from "../../utils/D3Utils";
import DOMSelector from "../../utils/DOMSelector";

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
            zoom: {},
            selector: "#" + this.props.divId,
            localG: {},
            linkedByIndex: {},
            toggle: 0
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

    /////+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    /////+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    circleLayout(nodes) {
        const radius = nodes.length * 10;
        const offsetX = DOMSelector.getWidth(this.state.selector)/2;
        const offsetY = DOMSelector.getHeight(this.state.selector)/2;

        nodes.sort((node1, node2) => {
            if(node1.type !== node2.type) {
                return node1.type.localeCompare(node2.type);
            } else {
                return node1.name.localeCompare(node2.name);
            }
        });

        // use to scale node index to theta value
        var scale = d3.scale.linear()
            .domain([0, nodes.length])
            .range([0, 2 * Math.PI]);

        // calculate theta for each node
        nodes.forEach(function(d, i) {
            // calculate polar coordinates
            var theta  = scale(i);
            var radial = radius;

            // convert to cartesian coordinates
            d.x = radial * Math.sin(theta) + offsetX;
            d.y = radial * Math.cos(theta) + offsetY;
        });
    }
    /////+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    /////+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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

        /////+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /////+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        data.edges.forEach(function(d, i) {
            d.source = isNaN(d.source) ? d.source : data.nodes[d.source];
            d.target = isNaN(d.target) ? d.target : data.nodes[d.target];
        });

        this.circleLayout(data.nodes);
        /////+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /////+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


        this.addNodes();
        this.addLinks();
        this.updateForceLayout(data);

        this.createConnectedIndex(data);
    }

    createConnectedIndex(data) {
        this.state.linkedByIndex = {};

        //Create an array logging what is connected to what
        for (let i = 0; i < data.nodes.length; i++) {
            this.state.linkedByIndex[i + "," + i] = 1;
        };
        data.edges.forEach((d) => {
            this.state.linkedByIndex[d.source.index + "," + d.target.index] = 1;
        });

    }

    connectedNodes(d, state, props, thiz) {
        function neighboring(a, b) {
            return state.linkedByIndex[a.index + "," + b.index];
        }

        if(d3.event.ctrlKey) {
            d = d3.select(thiz).node().__data__;
            state.nodes.style("opacity", (o) => {
                return neighboring(d, o) | neighboring(o, d) ? (o.visible ? 1 : props.disabledOpacity) : 0.1;
            });
            state.links.style("opacity", (o) => {
                return d.index==o.source.index | d.index==o.target.index ? (o.visible ? 1 : props.disabledOpacity) : 0.1;
            });
            //Reduce the op
            state.toggle = 1;
        } else if (state.toggle == 1) {
            //Put them back to opacity=1
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
            .attr('transform', 'translate(' + this.state.zoom.translate() +') scale(' + this.state.zoom.scale() + ')');

        return this.state.zoom;
    }

    dismissOldSvg() {
        d3.select(this.state.selector).select("svg").remove();
    };

    createSvg() {
        const svg = D3Utils.createSvg(this.state.selector)
            .attr("class", "force-graph")
            .on("click", (d) => EventHandlers.onClickSvg(d));

        const vis = svg
            .append('svg:g')
            .attr("id", "gAll");

        this.state.g = vis;
        svg.call(this.createOnZoomBehavior(vis));

        svg.append("defs").selectAll("marker")
            .data(["suit", "licensing", "resolved"])
            .enter().append("marker")
            .attr("id", function(d) { return d; })
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 45)
            .attr("refY", 0)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5 L10,0 L0, -5")
            .style("stroke", "#4679BD");

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
            //.chargeDistance(300)
            //.friction(0.5)
            //.gravity(0.2)
            .linkDistance(70)
            .nodes(data.nodes)
            .links(data.edges)
            .size([DOMSelector.getWidth(this.state.selector), DOMSelector.getHeight(this.state.selector)]);
    }

    updateGraphData(data) {
        this.state.nodes = this.state.nodes.data(data.nodes);
        this.state.links = this.state.links.data(data.edges);
    }

    addLinks() {
        this.state.links
            .enter()
            .insert("line", "g")
            .attr("class", "link ")
            .attr("x1", function(d) { return d.source.x; })/////+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            .attr("y1", function(d) { return d.source.y; })/////+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            .attr("x2", function(d) { return d.target.x; })/////+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            .attr("y2", function(d) { return d.target.y; });/////+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        this.state.links
            .attr("opacity", (d) => { return d.visible ? "1" : this.props.disabledOpacity})
        //.style("marker-end",  "url(#suit)");
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
            .attr("transform", d => `translate(${d.x},${d.y})`)/////+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            .style("fill", (d) => {
                return Constants.getColor(d.type ? d.type : d.category)
            });

        g.append("circle")
            .attr("class", "circle")
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
            .attr("class", "unselectable force-text-label")
            .text((d) => {
                const count = d.count - (parseInt(d.weight) || 0);

                return (count && count > 0 ) ? `+${count}` : ""
            })
            .call(this.getTextBox);

        g1.insert("rect","text")
            .attr("x", function(d){return d.bbox.x - padding })
            .attr("y", function(d){return d.bbox.y - padding })
            .attr("width", function(d){return d.bbox.width + (d.bbox.width ? padding*2 : 0)})
            .attr("height", function(d){return d.bbox.height + (d.bbox.height ? padding*2 : 0)})
            .attr("rx", 3)
            .attr("ry", 3)
            .style("fill", function(d){return Constants.getColor(d.type)});
    }

    addNodeText(g) {
        g.append("text")
            .attr("class", "force-text  unselectable")
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
                if(d.visible || this.props.enableFiltered) {
                    EventHandlers.onDoubleClickNode(d, this.props);
                }
            })
            .on("contextmenu", (d) => {
                if(this.props.showContextMenu && (d.visible || this.props.enableFiltered)) {
                    EventHandlers.onContextMenuNode(d, this.props);
                }
            })
            .on("click", function(d) {
                connectedNodes(d, state, props, this);
            })
            .on("mouseover", (d) => {
                EventHandlers.onMouseOver(d);
            })
            .on("mouseleave", (d) => {
                EventHandlers.onMouseLeave(d);
            })
            .call(
                this.state.force.drag()
                    .on("dragstart", (d) => {
                        if(d.visible || this.props.enableFiltered) {
                            EventHandlers.onDragStartNode(d);
                        }
                    })
                    .on("drag", (d) => {
                        if(d.visible || this.props.enableFiltered) {
                            EventHandlers.onDragNode(d);
                        }
                    })
                    .on("dragend", (d) => {
                        if(d.visible || this.props.enableFiltered) {
                            EventHandlers.onDragEndNode(d);
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
}