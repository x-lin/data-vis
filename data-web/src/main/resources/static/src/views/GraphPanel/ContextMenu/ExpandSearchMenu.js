import React from "react";
import { connect } from "react-redux";
import { DropdownButton, MenuItem, Nav, NavItem } from "react-bootstrap";
import { Table, Tr, Td, Thead, Th } from "reactable";

import Constants from "../../../config/Constants";
import CircleSpan from "../../widgets/CircleSpan";
import Label from "../../widgets/Label";
import { getNeighbors } from "../../../actions/aggregated/GETNeighbors";
import { searchNeighborsSingle } from "../../../actions/aggregated/SearchNeighborsSingle";
import { expandNode } from "../../../actions/action-creators/GraphActionCreators";
import { NEIGHBORS_SINGLE_FETCH_ERROR, NEIGHBORS_SINGLE_FETCH_START, NEIGHBORS_SINGLE_FETCH_SUCCESS }
    from "../../../actions/action-creators/SearchNeighborsSingleActions";

const UPSTREAM = "UPSTREAM";
const DOWNSTREAM = "DOWNSTREAM";
const BOTH ="BOTH";

export default class ExpandSearchMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clicked: BOTH
        }
    }

    componentWillMount() {
        this.props.getNeighborsSingle(this.props.d);
    }

    setClicked(direction) {
        this.setState({clicked: direction});
    }

    onClick(key, toNode) {
        this.props.expandNode(key, toNode);
    }

    render() {
        let data = this.props.data;

        if(this.state.clicked != BOTH) {
            data = data.filter((node) => {
                return !node.direction || node.direction === this.state.clicked;
            })
        }

        data = data.map((node, index) => {
            return (
                <Tr key={index}>
                    <Td column="Name" value={node.name}>
                        <a onClick={(key) => this.onClick(this.props.d.key, node)}>
                            {node.name} <Label bgColor={Constants.getColor(node.type)}>{node.type}</Label>
                        </a>
                    </Td>
                </Tr>
            );
        });

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
            <div className="dropdown-content-item">
                <div style={{float: "right", padding: "10px 0px"}}>
                    <a onClick={(direction) => this.setClicked(BOTH)}
                       style={this.state.clicked === BOTH ? activeLinkStyle : linkStyle}
                       title="Search in both directions">
                        <span className="fa fa-arrows-v"/>
                    </a>
                    <a onClick={(direction) => this.setClicked(UPSTREAM)}
                       style={this.state.clicked === UPSTREAM ? activeLinkStyle : linkStyle}
                       title="Search upstream">
                        <span className="fa fa-long-arrow-up"/>
                    </a>
                    <a onClick={(direction) => this.setClicked(DOWNSTREAM)}
                       style={this.state.clicked === DOWNSTREAM ? activeLinkStyle : linkStyle}
                       title="Search downstream">
                        <span className="fa fa-long-arrow-down"/>
                    </a>
                </div>

                {this.props.status === NEIGHBORS_SINGLE_FETCH_START && "Loading..."}

                {this.props.status === NEIGHBORS_SINGLE_FETCH_SUCCESS &&
                <div style={{float: "left", padding: "10px 0px"}}>{`${data.length} result${data.length !== 1 ? "s" : ""} found.`}</div>}

                {this.props.status === NEIGHBORS_SINGLE_FETCH_SUCCESS &&
                <Table className="table table-sm table-hover contextmenu-table" itemsPerPage={10} sortable={["Name"]}
                       filterable={['Name']} pageButtonLimit={5}>
                    {data}
                </Table>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.contextmenu.search,
        status: state.contextmenu.searchStatus
        //coverage: state.coverage
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        getNeighborsSingle: (node) => {
            dispatch(searchNeighborsSingle(node));
        },
        getNeighbors: (category, key, paramsString) => {
            dispatch(getNeighbors(category, key, paramsString));
        },
        expandNode: (key, toNode) => {
            dispatch(expandNode(key, toNode));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(ExpandSearchMenu);