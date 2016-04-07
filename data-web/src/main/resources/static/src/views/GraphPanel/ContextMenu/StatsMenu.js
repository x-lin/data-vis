import React from "react";
import d3 from "d3";
import { OverlayTrigger, Tooltip} from "react-bootstrap";
import { connect } from "react-redux";

import Constants from "../../../config/Constants";
import CircleSpan from "../../widgets/CircleSpan";
import Label from "../../widgets/Label";
import { getNeighborTypes } from "../../../actions/aggregated/GETNeighborTypes";
import { filterNeighborTypes } from "../../../actions/action-creators/ContextMenuActions";
import { getNeighbors } from "../../../actions/aggregated/GETNeighbors";
import { NEIGHBORTYPES_FETCH_SUCCESS } from "../../../actions/action-creators/SearchNeighborTypesActions";

const UPSTREAM = "UPSTREAM";
const DOWNSTREAM = "DOWNSTREAM";

class StatsMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            height: 0
        }
    }

    componentWillMount() {
        if(this.props.d !== this.props.node) {
            this.props.getNeighborTypes(this.props.d);
        }
    }

    componentDidMount() {
        const bbox = $("#"+ "stats-menu")[0].getBoundingClientRect();;

        this.setState({
            width: bbox.width ,
            height: bbox.height
        });
    }

    setFilterDirection(direction) {
        this.props.filterNeighborTypes(direction);
    }

    getNeighbors(typeKey) {
        console.log("double clicked")
        console.log(typeKey);

        const { node, filterDirection } = this.props;
        let paramsString = `type=${typeKey}`;
        if(filterDirection) {
            if(filterDirection === UPSTREAM) {
                paramsString += "&downstream=false";
            } else if(filterDirection === DOWNSTREAM) {
                paramsString += "&upstream=false";
            }
        }

        this.props.getNeighbors(node.type, node.key, paramsString);
    }

    render() {
        const { width, height } = this.state;
        const { data } = this.props;
        
        let chart, count=0;

        const translate = `translate(150,0)`;

        if(width-150 > 0 && data && data.length > 0){
            const max = d3.max(data, entry => entry.count);

            const x = d3.scale.linear()
                .domain([0, max])
                .range([10, width-150]);

            chart = data.map((entry, index) => {
                return <g key={index}>
                    <OverlayTrigger placement="right" overlay={<Tooltip id={index}>{entry.node.name}</Tooltip>}>
                        <g
                        className="tick axis"
                        transform={`translate(0, ${10.5+14*index})`}>
                            <text
                                dy=".32em" x="-6" y="0"
                                style={{textAnchor: "end"}}
                                onDoubleClick={() => this.getNeighbors(entry.node.key)}
                            >
                                {entry.node.name.length > 24 ? entry.node.name.substring(0,24)+"..." : entry.node.name}
                            </text>
                        </g>
                    </OverlayTrigger>
                    <OverlayTrigger placement="right" overlay={<Tooltip id={index}>{entry.count}</Tooltip>}>
                        <g>
                            <rect
                                className="bar"
                                fill={Constants.getColor(entry.node.name)}
                                x="0"
                                y={4+index*14}
                                width={x(entry.count) - x(0) + 10}
                                height="13"
                                onDoubleClick={() => this.getNeighbors(entry.node.key)}
                            />
                            <text
                                transform={`translate(1, ${14+index*14})`}
                                fill={Constants.getContrastColor(Constants.getColor(entry.node.name))}
                                onDoubleClick={() => this.getNeighbors(entry.node.key)}
                            >
                                {entry.count}
                            </text>
                        </g>
                    </OverlayTrigger>
                </g>
            });

            count = data.reduce((count, entry) => {
                if(entry.count) {
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

        return <div style={{width: "100%", height: "100%", padding: "10px"}} className="dropdown-content-item">
            <div style={{float: "left", padding: "10px 0px"}}>{`${count} node${count !== 1 ? "s" : ""} found.`}</div>

            <div style={{float: "right", padding: "10px 0px"}}>
                <a onClick={(direction) => this.setFilterDirection(null)}
                   style={this.props.filterDirection === null ? activeLinkStyle : linkStyle}
                   title="Show stats for both directions">
                    <span className="fa fa-arrows-v"/>
                </a>
                <a onClick={(direction) => this.setFilterDirection(UPSTREAM)}
                   style={this.props.filterDirection === UPSTREAM ? activeLinkStyle : linkStyle}
                   title="Show upstream">
                    <span className="fa fa-long-arrow-up"/>
                </a>
                <a onClick={(direction) => this.setFilterDirection(DOWNSTREAM)}
                   style={this.props.filterDirection === DOWNSTREAM ? activeLinkStyle : linkStyle}
                   title="Show downstream">
                    <span className="fa fa-long-arrow-down"/>
                </a>
            </div>
            <div  id="stats-menu">
                <svg width="100%" height={data.length*14+10}>
                    <g transform={translate}>
                        {chart}
                    </g>
                </svg>
            </div>
        </div>
    }
}

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
        getNeighbors: (type, key, params) => {
            dispatch(getNeighbors(type, key, params));
        },
        getNeighborTypes: (node) => {
            dispatch(getNeighborTypes(node))
        },
        filterNeighborTypes: (direction) => {
            dispatch(filterNeighborTypes(direction))
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(StatsMenu);