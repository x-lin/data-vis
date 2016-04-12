import React from "react";
import { connect } from "react-redux";
import { DropdownButton, MenuItem, Nav, NavItem } from "react-bootstrap";
import { Table, Tr, Td, Thead, Th } from "reactable";

import Constants from "../../../config/Constants";
import CircleSpan from "../../widgets/CircleSpan";
import Label from "../../widgets/Label";
import { getNeighbors } from "../../../actions/aggregated/GETNeighbors";
import { expandNode } from "../../../actions/action-creators/GraphActionCreators";

import ExpandSearchMenu from "./ExpandSearchMenu";
import ExpandStatsBasedMenu from "./ExpandStatsBasedMenu";
import ExpandConfiguredMenu from "./ExpandConfiguredMenu";

const PREDEFINED = "PREDEFINED";
const STATSBASED = "STATSBASED";
const SEARCH = "SEARCH";

export default class ExpandMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menu: PREDEFINED,
            activeKey: 1
        }
    }

    goUpstream(key, category) {
        const paramsString = "type=FEAT&type=SSS&type=SRS&type=PSRS&type=WP&downstream=false&limit=500";

        this.props.getNeighbors(category, key, paramsString);
    }

    goDownstream(key, category) {
        const paramsString = "type=FEAT&type=SSS&type=SRS&type=PSRS&type=WP&upstream=false&limit=500";

        this.props.getNeighbors(category, key, paramsString);
    }

    setMenuType(number) {
        switch(number) {
            case 1:
                this.setState({menu: PREDEFINED, activeKey: number});
                break;
            case 2:
                this.setState({menu: STATSBASED, activeKey: number});
                break;
            case 3:
                this.setState({menu: SEARCH, activeKey: number});
                break;
        }
    }

    renderMenu() {
        if(this.state.menu === PREDEFINED) {
            return <ExpandConfiguredMenu d={this.props.d} />;
        } else if(this.state.menu === STATSBASED) {
            return <ExpandStatsBasedMenu d={this.props.d} />;
        } else if(this.state.menu === SEARCH) {
            return <ExpandSearchMenu d={this.props.d} />;
        }
    }

    render() {
        return (
            <div>
                <Nav bsStyle="pills" justified activeKey={this.state.activeKey} onSelect={(number) => this.setMenuType(number)}>
                    <NavItem eventKey={1} title="Pre-configured expansion options"><span style={{whiteSpace: "nowrap"}}>Pre-defined</span></NavItem>
                    <NavItem eventKey={2} title="Stats based expansions"><span style={{whiteSpace: "nowrap"}}>Stats-based</span></NavItem>
                    <NavItem eventKey={3} title="Search for single nodes">Search</NavItem>
                </Nav>
                <div className="dropdown">
                    {this.renderMenu()}
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