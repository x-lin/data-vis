import React from "react";
import { connect } from "react-redux";
import { DropdownButton, MenuItem, Nav, NavItem } from "react-bootstrap";
import { Table, Tr, Td, Thead, Th } from "reactable";

import Constants from "../../../config/Constants";
import CircleSpan from "../../widgets/CircleSpan";
import Label from "../../widgets/Label";
import { getNeighbors } from "../../../actions/aggregated/GETNeighbors";
import { expandNode } from "../../../actions/action-creators/GraphActionCreators";

const UPSTREAM = "UPSTREAM";
const DOWNSTREAM = "DOWNSTREAM";
const BOTH ="BOTH";

export default class ExpandMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clicked: BOTH
        }
    }

    setClicked(direction) {
        this.setState({clicked: direction});
    }

    goUpstream(key, category) {
        const paramsString = "type=FEAT&type=SSS&type=SRS&type=PSRS&type=WP&downstream=false&limit=500";

        this.props.getNeighbors(category, key, paramsString);
    }

    goDownstream(key, category) {
        const paramsString = "type=FEAT&type=SSS&type=SRS&type=PSRS&type=WP&upstream=false&limit=500";

        this.props.getNeighbors(category, key, paramsString);
    }

    render() {
        const { key, type } = this.props.d;

        const prepared = this.props.coverage.data.map((coverage, index) => {
            const count = coverage.testcases ? coverage.testcases.length : 0;

            return (
                <Tr key={index} className = { count ? "" :  "bg-red"}>
                    <Td column="Name" value={coverage.name}>
                        <a onClick={(key) => this.onClick(coverage.key)}>
                            <CircleSpan radius="8px" color={Constants.getColor(coverage.type)} />&nbsp;
                            {coverage.name}
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
            <div>

                <Nav bsStyle="pills" justified activeKey={1} onSelect={(e) => {console.log(e)}}>
                    <NavItem eventKey={1} title="Pre-configured expansion options">Configured</NavItem>
                    <NavItem eventKey={2} title="Stats based expansions"><span style={{whiteSpace: "nowrap"}}>Stats-based</span></NavItem>
                    <NavItem eventKey={3} title="Search for single nodes">Search</NavItem>
                </Nav>
        <div className="dropdown">
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

                {this.props.coverage &&
                    <Table className="table table-sm table-hover contextmenu-table" itemsPerPage={10} sortable={["Name"]}
                           filterable={['Name']} pageButtonLimit={5}>
                        {prepared}
                    </Table>
                    }
            </div>

            <div className="dropdown-content-item dropdown-content-item-hover cursor" onClick={() => this.goUpstream(key, type)}>
                <span className="fa fa-long-arrow-up"/>&nbsp;Upstr. Feature Decomposition
            </div>
            <div className="dropdown-content-item dropdown-content-item-hover cursor" onClick={() => this.goDownstream(key, type)}>
                <span className="fa fa-long-arrow-down"/>&nbsp;Downstr. Feature Decomposition
            </div>
        </div>
</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        coverage: state.coverage
    };
};

const mapDispatchProps = (dispatch) => {
    return {
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
)(ExpandMenu);