import React from "react";
import dagre from "dagre";
import d3 from "d3";
import { Popover, OverlayTrigger, Button, ListGroup, ListGroupItem } from "react-bootstrap";

import { addNode, removeNode, setDirection, setMaxPathLength, setMinPathLength, toggleExclude, toggleOutput }
    from "../../../actions/action-creators/QueryBuilderActions";
import Constants from "../../../config/Constants";

class GraphQueryBuilder extends React.Component {
    componentDidMount() {
        this.props.addNode(null, this.props.node);
        this.resize();
    }

    componentDidUpdate() {
        this.resize();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    createDagre() {
        // Create a new directed graph
        const g = new dagre.graphlib.Graph();

        // Set an object for the graph label
        g.setGraph({});

        // Default to assigning a new object as a label for each new edge.
        g.setDefaultEdgeLabel(function() {
            return {};
        });

        this.props.nodes.forEach((node) => {
            g.setNode(node.nodeId, Object.assign({}, node, {
                width: 200,
                height: 150
            }));
        });

        this.props.edges.forEach((edge) => {
            g.setEdge(edge.sourceId, edge.targetId);
        });

        dagre.layout(g);

        return g.nodes().map((node) => {
            const nod = g.node(node);
            nod.x = nod.x + 20;
            return nod;
        });
    }

    resize() {
        const selector = "#svg-query-builder";
        const bbox = $(selector)[0].getBBox();

        if (bbox) {
            const padding = 15;
            const extra = 80;

            $(selector)
                .attr("width", bbox.width + 2 * padding + extra)
                .attr("height", bbox.height + 2 * padding + extra);
        }
    }

    render() {
        const RECT_WIDTH = 200;
        const RECT_HEIGHT = 50;
        const CIRCLE_RADIUS = RECT_HEIGHT / 2;

        const nodes = this.createDagre();

        const nodeIndex = nodes.reduce((object, node) => {
            object[node.nodeId] = node;
            return object;
        }, {});

        const links = this.props.edges.map((link) => {
            const newLink = Object.assign({}, link);
            newLink.source = nodeIndex[link.sourceId];
            newLink.target = nodeIndex[link.targetId];

            return newLink;
        });

        const lines = links.map((line, index) => {
            const yLength = line.target.y - line.source.y;
            const xLength = line.target.x - line.source.x;
            const ratioY = yLength ? RECT_HEIGHT / (yLength*2) : 0;
            const ratioX = xLength ? ratioY / xLength : 0;
            //const offset = Math.sqrt((ratioX * xLength) * (ratioX * xLength) + (ratioY * yLength) * (ratioY * yLength));

            return <line
                key={index}
                className="link"
                x1={line.source.x + line.source.x*ratioX} x2={line.target.x - line.target.x*ratioX}
                y1={line.source.y + line.source.y*ratioY/2} y2={line.target.y - line.target.y*ratioY/2}
                stroke="#666"
                style={{
                        markerStart: line.direction !== "Upstream" ? 'url("#builder-marker-start")' : null,
                        markerEnd: line.direction !== "Downstream" ? 'url("#builder-marker-end")' : null
                    }} />;
        });

        const nodesSvg = nodes.map((node, index) => {
            return (
                <g key={index} className="g" transform={`translate(${node.x}, ${node.y})`} fill={Constants.getColor(node.type)}>
                    {index === 0 ?
                        <circle className="circle" stroke="#FFF" strokeWidth="1.5" r={CIRCLE_RADIUS} /> :
                        <rect className="circle" stroke="#FFF" strokeWidth="1.5" transform={`translate(${-RECT_WIDTH / 2}, ${-RECT_HEIGHT / 2})`}
                          width={RECT_WIDTH} height={RECT_HEIGHT}
                        />
                    }
                    {index === 0 ?
                        <text className="force-text unselectable" style={{ font: "11px sans-serif" }}>
                            {node.name}
                        </text> :
                        null
                    }
                </g>
            );
        });

        const textButton = nodes.map((node, index) => {
            if (index === 0) {
                return null;
            }

            const listGroupItems = () => {
                return this.props.nodeTypes.map((nodeType) => {
                    return <ListGroupItem href="#" active={nodeType.key === node.key} key={nodeType.key} onClick={() => {this.props.setNodeType(node.nodeId, nodeType)}}>
                        <span style={{ margin: "-8px -5px", display: "block" }}>{nodeType.name}</span>
                    </ListGroupItem>;
                })
            };

            const popover = <Popover className="popover-modal">
                <ListGroup style={{ margin: "-11px -16px" }}>
                    {listGroupItems()}
                </ListGroup>
            </Popover>;

            return (
                <div style={{ left: node.x - 60, top: node.y, position: "absolute", textAlign: "center", width: "150px" }} key={index}>
                    <OverlayTrigger trigger="click" rootClose placement="right" overlay={popover}>
                        <Button bsStyle="default" className="btn-xs">{node.name} <span className="caret" /></Button>
                    </OverlayTrigger>
                </div>
                    );
        });

        const nodeButtons = nodes.map((node, index) => {
            const y = node.y + 12;
            return (
                <div key={index}>
                    {index !== 0 ?
                    <div style={{ left: node.x + 95, top: node.y - 10, position: "absolute" }}>
                        <button className="btn btn-default btn-xs" onClick={() => {this.props.removeNode(node.nodeId)}}>
                            <strong>x</strong>
                        </button>
                    </div> : null}
                    <div style={{ left: node.x - 85, top: y + 5, position: "absolute" }}>
                        <button className="btn btn-default btn-xs" onClick={() => {this.props.addNode(node.nodeId)}}>
                            <span className="fa fa-plus" />
                        </button>
                        <button className="btn btn-default btn-xs">
                            <span className="fa fa-filter" /> <span className="caret" />
                        </button>
                    </div>
                    <div style={{ left: node.x + 70, top: y + 5, position: "absolute" }}>
                        <button className={`btn btn-default btn-xs ${node.optional ? "btn-alternative active" : ""}`} onClick={() => this.props.toggleOptional(node.nodeId)}>
                            <strong>NIL</strong>
                        </button>
                        <button className={`btn btn-default btn-xs ${node.isOutput ? "btn-alternative active" : ""}`} onClick={() => this.props.toggleOutput(node.nodeId)}>
                            <span className="fa fa-file-text-o" />
                        </button>
                    </div>
                </div>

            );
        });

        const linkButtons = links.map((link, index) => {
            const x = link.source.x + (link.target.x - link.source.x)/2 - 25;
            const y = link.source.y + (link.target.y - link.source.y)/2 - 25;

            const directions = ["Downstream", "Upstream", "All"];

            const directionPopover = <Popover className="popover-modal">
                <ListGroup style={{ margin: "-11px -16px" }}>
                    {
                        directions.map((direction) => {
                            return <ListGroupItem href="#" active={link.direction === direction}
                                           onClick={() => this.props.setDirection(link.source.nodeId, link.target.nodeId, direction)}
                                                  key={direction} >
                                <span style={{ margin: "-8px -5px", display: "block" }}>{direction}</span>
                            </ListGroupItem>
                        })
                    }
                </ListGroup>
            </Popover>;

            const listGroupItems = (sourceId, targetId, current, fireFunc) => {
                return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => {
                    return <ListGroupItem href="#" active={number === current} key={number} onClick={() => fireFunc(sourceId, targetId, number)}>
                        <span style={{ margin: "-8px -5px", display: "block" }}>{number}</span>
                    </ListGroupItem>;
                })
            };
            
            const minPath = <Popover className="popover-modal">
                <ListGroup style={{ margin: "-11px -16px" }}>
                    {listGroupItems(link.source.nodeId, link.target.nodeId, link.minPathLength, this.props.setMinPathLength)}
                </ListGroup>
            </Popover>;

            const maxPath = <Popover className="popover-modal">
                <ListGroup style={{ margin: "-11px -16px" }}>
                    {listGroupItems(link.source.nodeId, link.target.nodeId, link.maxPathLength, this.props.setMaxPathLength)}
                </ListGroup>
            </Popover>;

            return (
                <div style={{ left: x, top: y, position: "absolute", textAlign: "center" }} key={index}>
                    <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={directionPopover}>
                        <Button bsStyle="default" className="btn-xs">{link.direction} <span className="caret" /></Button>
                    </OverlayTrigger>

                    <div>
                        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={minPath}>
                            <Button bsStyle="default" className="btn-xs">{link.minPathLength} <span className="caret" /></Button>
                        </OverlayTrigger>
                        &nbsp; to &nbsp;
                        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={maxPath}>
                            <Button bsStyle="default" className="btn-xs">{link.maxPathLength} <span className="caret" /></Button>
                        </OverlayTrigger>
                    </div>
                </div>
            );
        });

        return (
            <div style={{ backgroundColor: "#EFEFEF" }}>
                <div>
                    <svg id="svg-query-builder"
                      width="100%"
                      height="1500"
                      style={{ background: "none", display: "block" }}
                    >
                        <defs>
                            <marker id="builder-marker-start" viewBox="-10 -5 10 10"markerWidth="10" markerHeight="10" orient="auto">
                                <path d="M0,5L10,0L0,5 L-10,0 L0, -5 Z" style={{ fill: "#666" }}></path>
                            </marker>
                            <marker id="builder-marker-end" viewBox="0 -5 10 10" markerWidth="10" markerHeight="10" orient="auto">
                                <path d="M0,5L10,0L0,5 L10,0 L0, -5 Z" style={{ fill: "#666" }}></path>
                            </marker>
                        </defs>
                        <g>
                            {nodesSvg}
                            {lines}
                        </g>

                    </svg>
                    {nodeButtons}
                    {linkButtons}
                    {textButton}
                    <div style={{padding: "10px 0px"}}>
                        <button className="btn bg-navy" onClick={() => this.props.searchByQueryBuilder({
                            source: this.props.nodes[0],
                            nodes: this.props.nodes.slice(1),
                            edges: this.props.edges
                        })}>Run!</button>
                    </div>
                </div>
            </div>
        );
    }
}



export default GraphQueryBuilder;
