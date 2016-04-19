import React from "react";
import d3 from "d3";
import { OverlayTrigger, Tooltip} from "react-bootstrap";
import { connect } from "react-redux";

import Constants from "../../../config/Constants";
import { getNeighborTypes } from "../../../actions/aggregated/promises/GETNeighborTypesActions";
import { filterNeighborTypes } from "../../../actions/action-creators/ContextMenuActions";
import { expandNeighbors } from "../../../actions/aggregated/SearchNeighborsActions";
import { createParams } from "../../../actions/aggregated/SearchNeighborsParams";
import { UPSTREAM, DOWNSTREAM } from "../../../config/Defaults";

class ExpandStatsBasedMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            height: 0
        };
    }

    componentWillMount() {
        if (this.props.d !== this.props.node) {
            this.props.getNeighborTypes(this.props.d);
        }
    }

    componentDidMount() {
        const bbox = $(`#${"stats-menu"}`)[0].getBoundingClientRect();

        this.setState({
            width: bbox.width,
            height: bbox.height
        });
    }

    setFilterDirection(direction) {
        this.props.filterNeighborTypes(direction);
    }

    getNeighbors(typeKey) {
        const { node, filterDirection } = this.props;
        const params = createParams()
            .addType(typeKey);

        if (filterDirection) {
            if (filterDirection === UPSTREAM) {
                params.setDownstream(false);
            } else if (filterDirection === DOWNSTREAM) {
                params.setUpstream(false);
            }
        }

        this.props.expandNeighbors(node.type, node.key, params);
    }

    render() {
        const { width } = this.state;
        const { data } = this.props;

        let chart;
        let count = 0;

        const translate = "translate(150,0)";

        if (width - 150 > 0 && data && data.length > 0) {
            const max = d3.max(data, entry => entry.count);

            const x = d3.scale.linear()
                .domain([0, max])
                .range([10, width - 150]);

            chart = data.map((entry, index) => {
                return (
                    <g key={index}>
                        <OverlayTrigger placement="right" overlay={<Tooltip id={index}>{entry.node.name}</Tooltip>}>
                            <g
                              className="tick axis"
                              transform={`translate(0, ${10.5 + 14 * index})`}
                            >
                                <text
                                  dy=".32em" x="-6" y="0"
                                  style={{ textAnchor: "end" }}
                                  onDoubleClick={() => this.getNeighbors(entry.node.key)}
                                >
                                    {entry.node.name.length > 24 ? `${entry.node.name.substring(0, 24)}...` : entry.node.name}
                                </text>
                            </g>
                        </OverlayTrigger>
                        <OverlayTrigger placement="right" overlay={<Tooltip id={index}>{entry.count}</Tooltip>}>
                            <g>
                                <rect
                                  className="bar"
                                  fill={Constants.getColor(entry.node.name)}
                                  x="0"
                                  y={4 + index * 14}
                                  width={x(entry.count) - x(0) + 10}
                                  height="13"
                                  onDoubleClick={() => this.getNeighbors(entry.node.key)}
                                />
                                <text
                                  transform={`translate(1, ${14 + index * 14})`}
                                  fill={Constants.getContrastColor(Constants.getColor(entry.node.name))}
                                  onDoubleClick={() => this.getNeighbors(entry.node.key)}
                                >
                                    {entry.count}
                                </text>
                            </g>
                        </OverlayTrigger>
                    </g>
                );
            });

            count = data.reduce((count, entry) => {
                if (entry.count) {
                    return count + entry.count;
                } else {
                    return count;
                }
            }, 0);
        }

        const linkStyle = {
            color: "#444",
            boxShadow: "0 0 0 .03em #ddd",
            padding: "6px 12px"
        };

        const activeLinkStyle = {
            backgroundColor: "#2c3b41",
            color: "#fff",
            boxShadow: "0 0 0 .03em #2c3b41",
            pointerEvents: "none",
            cursor: "default",
            padding: "6px 12px"
        };

        return (
        <div style={{ width: "100%", height: "100%", padding: "10px" }} className="dropdown-content-item">
            <div style={{ float: "left", padding: "10px 0px" }}>{`${count} node${count !== 1 ? "s" : ""} found.`}</div>

            <div style={{ float: "right", padding: "10px 0px" }}>
                <a onClick={() => this.setFilterDirection(null)}
                  style={this.props.filterDirection === null ? activeLinkStyle : linkStyle}
                  title="Show stats for both directions"
                >
                    <span className="fa fa-arrows-v" />
                </a>
                <a onClick={() => this.setFilterDirection(UPSTREAM)}
                  style={this.props.filterDirection === UPSTREAM ? activeLinkStyle : linkStyle}
                  title="Show upstream"
                >
                    <span className="fa fa-long-arrow-up" />
                </a>
                <a onClick={() => this.setFilterDirection(DOWNSTREAM)}
                  style={this.props.filterDirection === DOWNSTREAM ? activeLinkStyle : linkStyle}
                  title="Show downstream"
                >
                    <span className="fa fa-long-arrow-down" />
                </a>
            </div>
            <div id="stats-menu">
                <svg width="100%" height={data.length * 14 + 10}>
                    <g transform={translate}>
                        {chart}
                    </g>
                </svg>
            </div>
        </div>
        );
    }
}

ExpandStatsBasedMenu.propTypes = {
    status: React.PropTypes.string,
    data: React.PropTypes.array.isRequired,
    d: React.PropTypes.object,
    node: React.PropTypes.object,
    filterDirection: React.PropTypes.string,
    filterNeighborTypes: React.PropTypes.func.isRequired,
    getNeighborTypes: React.PropTypes.func.isRequired,
    expandNeighbors: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        status: state.contextmenu.status,
        data: state.contextmenu.neighborTypes.data,
        node: state.contextmenu.neighborTypes.node,
        filterDirection: state.contextmenu.filterDirection
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        expandNeighbors: (type, key, params) => {
            dispatch(expandNeighbors(type, key, params));
        },
        getNeighborTypes: (node) => {
            dispatch(getNeighborTypes(node));
        },
        filterNeighborTypes: (direction) => {
            dispatch(filterNeighborTypes(direction));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(ExpandStatsBasedMenu);
