import React from "react";
import { connect } from "react-redux";
import { DropdownButton, MenuItem, Nav, NavItem } from "react-bootstrap";
import { Table, Tr, Td, Thead, Th } from "reactable";

import Constants from "../../../config/Constants";
import CircleSpan from "../../widgets/CircleSpan";
import Label from "../../widgets/Label";
import { expandNeighbors } from "../../../actions/aggregated/SearchNeighborsActions";
import { createParams } from "../../../actions/aggregated/SearchNeighborsParams";
import { expandNode } from "../../../actions/action-creators/GraphActions";

export default class ExpandConfiguredMenu extends React.Component {
    goUpstream(key, category) {
        const params = createParams()
            .setTypes(["FEAT", "SSS", "SRS", "PSRS", "WP"])
            .setDownstream(false)
            .setLimit(500)
            .getParams();

        this.props.expandNeighbors(category, key, params);
    }

    goDownstream(key, category) {
        const params = createParams()
            .setTypes(["FEAT", "SSS", "SRS", "PSRS", "WP"])
            .setUpstream(false)
            .setLimit(500)
            .getParams();

        this.props.expandNeighbors(category, key, params);
    }

    render() {
        const { key, type } = this.props.d;

        return (
            <div>
                <div className="dropdown-content-item dropdown-content-item-hover cursor" onClick={() => this.goUpstream(key, type)}>
                    <span className="fa fa-long-arrow-up"/>&nbsp;Upstr. Feature Decomposition
                </div>
                <div className="dropdown-content-item dropdown-content-item-hover cursor" onClick={() => this.goDownstream(key, type)}>
                    <span className="fa fa-long-arrow-down"/>&nbsp;Downstr. Feature Decomposition
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchProps = (dispatch) => {
    return {
        expandNeighbors: (category, key, params) => {
            dispatch(expandNeighbors(category, key, params));
        },
        expandNode: (key, toNode) => {
            dispatch(expandNode(key, toNode));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(ExpandConfiguredMenu);