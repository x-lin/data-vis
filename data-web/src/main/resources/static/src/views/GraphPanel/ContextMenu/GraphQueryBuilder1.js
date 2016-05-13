import React from "react";
import dagre from "dagre";
import d3 from "d3";
import { Popover, OverlayTrigger, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import Constants from "../../../config/Constants";

import Label from "../../widgets/Label";
import Header from "../../widgets/Header";
import Circle from "../../widgets/CircleSpan";
import { filterTypes, operators, relations, properties } from "../../../reducers/queryBuilderReducer";
import QueryBuilderQueries from "../../../config/QueryBuilderQueries";

class GraphQueryBuilder extends React.Component {
    componentDidMount() {
        this.props.addNode(null, this.props.node);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    createPopover(data, current, onClickFunc, includeLabel, id) {
        return <Popover className="popover-modal">
            <ListGroup style={{ margin: "-11px -16px" }}>
                {this.createList(data, current, onClickFunc, includeLabel)}
            </ListGroup>
        </Popover>
    }

    createPopoverChildren(children, id) {
        return <Popover className="popover-modal">
            <ListGroup style={{ margin: "-11px -16px" }}>
                {children}
            </ListGroup>
        </Popover>
    }

    createList(data, current, onClickFunc, includeLabel) {
        return data.map((entry) => {
            return <ListGroupItem href="#" active={entry.key === current.key} key={entry.key} onClick={() => onClickFunc(entry)}>
                <span style={{ margin: "-8px -5px", display: "block" }}>
                    {includeLabel && <Circle color={Constants.getColor(entry.name)} radius="7px" /> } {entry.name}
                </span>
            </ListGroupItem>;
        });
    }

    render() {
        const { nodes, edges } = this.props;

        const nodeIndex = nodes.reduce((object, node) => {
            object[node.nodeId] = node;
            return object;
        }, {});

        const links = edges.map((link) => {
            const newLink = Object.assign({}, link);
            newLink.source = nodeIndex[link.sourceId];
            newLink.target = nodeIndex[link.targetId];

            return newLink;
        });

        const rootBox = nodes.slice(0, 1).map((node) => {
            return <div className="box box-solid" key={node.nodeId} style={{ marginBottom: "5px" }}>
                <div className="box-body">
                    <table style={{ width: "100%", marginBottom: "10px" }}>
                        <tbody>
                        <tr>
                            <td style={{ width: "30%", maxWidth: "100px", textAlign: "center", padding: "10px" }}>
                                <svg width="40px" height="40px">
                                    <circle r="20" fill={Constants.getColor(node.type)} cx="20" cy="20" />
                                </svg>
                            </td>
                            <td style={{ padding: "10px", borderLeft: "1px dashed #EFEFEF" }}>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td style={{ paddingRight: "10px" }}><Header>Name</Header></td>
                                        <td><strong>{node.name}</strong></td>
                                    </tr>
                                    <tr>
                                        <td style={{ paddingRight: "10px" }}><Header>Type</Header></td>
                                        <td>
                                            <Label bgColor={Constants.getColor(node.type)}>{node.type}</Label>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    { nodes.length === 1 &&
                    <button className="btn btn-default btn-xs pull-right" onClick={() => {this.props.addNode(node.nodeId)}}>
                        <span className="fa fa-plus"/>
                    </button>
                    }
                </div>
            </div>;
        });

        const directions = ["Downstream", "Upstream", "All"];

        const boxes = nodes.slice(1).map((node, index) => {
            const link = links.filter(link => {
                return link.target.nodeId === node.nodeId;
            })[0];

            const directionPopover = this.createPopoverChildren(
                        directions.map((direction) => {
                            return <ListGroupItem href="#" active={link.direction === direction}
                                                  onClick={() => this.props.setDirection(link.source.nodeId, link.target.nodeId, direction)}
                                                  key={direction} >
                                <span style={{ margin: "-8px -5px", display: "block" }}>{direction}</span>
                            </ListGroupItem>
                        }));

            const listGroupItems = (sourceId, targetId, current, fireFunc) => {
                return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => {
                    return <ListGroupItem href="#" active={number === current} key={number} onClick={() => fireFunc(sourceId, targetId, number)}>
                        <span style={{ margin: "-8px -5px", display: "block" }}>{number}</span>
                    </ListGroupItem>;
                })
            };

            const minPath =  this.createPopoverChildren(listGroupItems(link.source.nodeId, link.target.nodeId, link.minPathLength, this.props.setMinPathLength));
            const maxPath = this.createPopoverChildren(listGroupItems(link.source.nodeId, link.target.nodeId, link.maxPathLength, this.props.setMaxPathLength));
            const filterOperator = this.createPopover(operators, node.filters.operator, (operator) => {
                this.props.updateFilterOperator(node.nodeId, operator);
            });

            const filters = node.filters.filters.map((filter, index) => {
                const subFilterOperator = this.createPopover(operators, filter.operator, (operator) => {
                    this.props.updateSubFilterOperator(node.nodeId, filter.filterId, operator);
                });

                const subFilters = filter.filters.map((subFilter, index) => {

                    const filterTypePopover = this.createPopover(filterTypes, subFilter.filterType, (type) => {
                        this.props.updateSubFilter(node.nodeId, filter.filterId, subFilter.filterId, Object.assign({}, subFilter, {
                            filterType: type
                        }));
                    });

                    const nodeTypePopover = this.createPopover(this.props.nodeTypes, subFilter.value, (value) => {
                        this.props.updateSubFilter(node.nodeId, filter.filterId, subFilter.filterId, Object.assign({}, subFilter, {
                            value: value
                        }));
                    }, true);

                    return <tr key={subFilter.filterId}>
                        {index === 0 &&
                        <td rowSpan={filter.filters.length} style={{ borderRight: "1px dashed #FFF", paddingRight: "5px" }}>
                            {filter.filters.length > 1 ?
                            <OverlayTrigger trigger="click" rootClose placement="right" overlay={subFilterOperator}>
                                <button className={`btn btn-default btn-xs`} style={{ minWidth: "50px" }}>{filter.operator.name} <span className="caret" /></button>
                            </OverlayTrigger>:
                            <div style={{ minWidth: "50px" }}></div>}
                        </td>
                        }
                        <td>
                            <OverlayTrigger trigger="click" rootClose placement="right" overlay={<span />}>
                                <Button bsStyle="default" className="btn-xs disabled" style={{ minWidth: "40px" }}> <span className="caret" /></Button>
                            </OverlayTrigger>
                        </td>
                        <td>
                            <OverlayTrigger trigger="click" rootClose placement="right" overlay={filterTypePopover}>
                                <Button bsStyle="default" className="btn-xs" style={{ minWidth: "70px" }}>
                                    {subFilter.filterType.name} <span className="caret" />
                                </Button>
                            </OverlayTrigger>
                        </td>
                        <td>
                            <OverlayTrigger trigger="click" rootClose placement="right" overlay={<span />}>
                                <Button bsStyle="default" className="btn-xs disabled" style={{ minWidth: "30px" }}>= <span className="caret" /></Button>
                            </OverlayTrigger>
                        </td>
                        <td style={{ padding: "0px 0px 0px 3px" }}>
                            <OverlayTrigger trigger="click" rootClose placement="right" overlay={nodeTypePopover}>
                                <Button bsStyle="default" className="btn-xs" style={{ minWidth: "200px" }}>
                                    <Circle color={Constants.getColor(subFilter.value.name)} radius="7px" /> {subFilter.value.name} <span className="caret" />
                                </Button>
                            </OverlayTrigger>
                        </td>
                        <td style={{ padding: "0px 0px 0px 20px" }}>
                            <Button bsStyle="default" className="btn-xs"
                                    onClick={() => this.props.removeSubFilter(node.nodeId, filter.filterId, subFilter.filterId)}>
                                <span className="fa fa-times" />
                            </Button>
                        </td>
                        {index === 0 &&
                        <td rowSpan={filter.filters.length} style={{ borderLeft: "1px dashed #FFF", paddingLeft: "5px" }}>
                            <Button bsStyle="default" className="btn-xs" onClick={() => this.props.addSubFilter(node.nodeId, filter.filterId)}>
                                <span className="fa fa-plus"/>
                            </Button>
                        </td>
                        }
                    </tr>
                });

                return <table style={{ backgroundColor: "#F2F2F2", borderCollapse: "separate", borderSpacing: "10px", margin: "5px 0px" }} key={filter.filterId}>
                    <thead>
                        <tr>
                            <td style={{ borderBottom: "1px dashed #FFF" }} colSpan="7">
                                <button className="btn btn-box-tool pull-right" onClick={() => this.props.removeFilter(node.nodeId, filter.filterId)}>
                                    <span className="fa fa-times" />
                                </button>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {subFilters}
                    </tbody>
                </table>
            });

            return <div className="box box-solid" key={node.nodeId} style={{ marginBottom: "5px" }}>
                <div className="box-body">
                    {index + 2 === nodes.length ?
                        <div className="box-tools pull-right">
                            <button className="btn btn-box-tool" onClick={() => this.props.removeNode(node.nodeId)}>
                                <span className="fa fa-times" />
                            </button>
                        </div> :
                        <div style={{ height: "29px" }} />
                    }

                    <table style={{ width: "100%" }}>
                        <tbody>
                        <tr style={{ borderBottom: "1px dashed #EFEFEF" }}>
                            <td style={{ width: "30%", maxWidth: "100px", textAlign: "center", padding: "10px" }}>
                                <svg width="8px" height="45px">
                                    <defs>
                                        <marker id="builder-marker-start" viewBox="-10 -5 10 10" markerWidth="4" markerHeight="4" orient="auto" refX="0">
                                            <path d="M0,5L10,0L0,5 L-10,0 L0, -5 Z" style={{ fill: "#999" }}></path>
                                        </marker>
                                        <marker id="builder-marker-end" viewBox="0 -5 10 10" markerWidth="4" markerHeight="4" orient="auto" refX="0">
                                            <path d="M0,5L10,0L0,5 L10,0 L0, -5 Z" style={{ fill: "#999" }}></path>
                                        </marker>
                                    </defs>
                                    <line x1="4" x2="4" y1="8" y2="37" stroke="#999" strokeWidth="2"
                                      style={{
                                            markerStart: link.direction !== "Downstream" ? 'url("#builder-marker-start")' : null,
                                            markerEnd: link.direction !== "Upstream" ? 'url("#builder-marker-end")' : null
                                        }}
                                    />
                                </svg>
                            </td>
                            <td style={{ padding: "10px", borderLeft: "1px dashed #EFEFEF" }}>
                                <table style={{ borderCollapse: "separate", borderSpacing: "10px" }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ paddingRight: "10px" }}><Header>Direction</Header></td>
                                            <td>
                                                <OverlayTrigger trigger="click" rootClose placement="right" overlay={directionPopover}>
                                                    <Button bsStyle="default" className="btn-xs">{link.direction} <span className="caret" /></Button>
                                                </OverlayTrigger>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ paddingRight: "10px" }}><Header>Path Length</Header></td>
                                            <td>
                                                <OverlayTrigger trigger="click" rootClose placement="right" overlay={minPath}>
                                                    <Button bsStyle="default" className="btn-xs"  style={{ minWidth: "40px" }}>{link.minPathLength} <span className="caret" /></Button>
                                                </OverlayTrigger>
                                                &nbsp; to &nbsp;
                                                <OverlayTrigger trigger="click" rootClose placement="right" overlay={maxPath}>
                                                    <Button bsStyle="default" className="btn-xs"  style={{ minWidth: "40px" }}>{link.maxPathLength} <span className="caret" /></Button>
                                                </OverlayTrigger>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ width: "30%", maxWidth: "100px", textAlign: "center", padding: "10px" }}>
                                <svg width="62px" height="32px">
                                    <rect x="1" y="1" width="60" height="30" fill="none" stroke="#999" strokeWidth="2"></rect>
                                </svg>

                            </td>
                            <td style={{ padding: "10px", borderLeft: "1px dashed #EFEFEF" }}>
                                <table style={{ borderCollapse: "separate", borderSpacing: "10px" }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ paddingRight: "10px", verticalAlign: "top" }}>
                                                <Header>Filter</Header>
                                            </td>
                                            <td>
                                                {node.filters.filters.length > 1 ?
                                                <OverlayTrigger trigger="click" rootClose placement="right" overlay={filterOperator}>
                                                    <button className={`btn btn-default btn-xs`} style={{ minWidth: "50px" }}>{node.filters.operator.name} <span className="caret" /></button>
                                                </OverlayTrigger> :
                                                <div style={{ minWidth: "50px" }}></div>}
                                            </td>
                                            <td>
                                                {filters}
                                            </td>
                                            <td>
                                                <Button bsStyle="default" className="btn-xs pull-right" onClick={() => this.props.addFilter(node.nodeId)}><span className="fa fa-plus" /></Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="pull-right">
                        <span style={{ marginRight: index + 2 === nodes.length ? "20px" : "41px" }}>
                            <button className={`btn btn-default btn-xs ${node.optional ? "btn-alternative active" : ""}`} onClick={() => this.props.toggleOptional(node.nodeId)}>
                                <strong>NIL</strong>
                            </button>
                            <button className={`btn btn-default btn-xs ${node.isOutput ? "btn-alternative active" : ""}`} onClick={() => this.props.toggleOutput(node.nodeId)}>
                                <span className="fa fa-file-text-o" />&nbsp;<span className="caret" />
                            </button>
                        </span>
                        {index + 2 === nodes.length &&
                        <button className="btn btn-default btn-xs" onClick={() => {this.props.addNode(node.nodeId)}}>
                            <span className="fa fa-plus" />
                        </button>
                        }
                    </div>
                </div>
            </div>
        });

        return (
                <div style={{ backgroundColor: "#EFEFEF", padding: "10px", display: "table-cell", verticalAlign: "top" }}>
                    {rootBox}
                    {boxes}
                    <div style={{ height: "30px" }}>
                        <button className="btn bg-navy pull-right" onClick={() => this.props.searchByQueryBuilder({
                         source: this.props.nodes[0],
                         nodes: this.props.nodes.slice(1),
                         edges: this.props.edges
                         })}>
                            Run!
                        </button>
                    </div>
                </div>

        );
    }
}



export default GraphQueryBuilder;
