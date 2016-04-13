import React from "react";
import { connect } from "react-redux";
import { DropdownButton, MenuItem, Nav, NavItem } from "react-bootstrap";
import { Table, Tr, Td, Thead, Th } from "reactable";

import Constants from "../../../config/Constants";
import CircleSpan from "../../widgets/CircleSpan";
import Label from "../../widgets/Label";
import { getNeighbors } from "../../../actions/aggregated/GETNeighbors";
import { expandNode } from "../../../actions/action-creators/GraphActions";

export default class ExpandConfiguredMenu extends React.Component {
    goUpstream(key, category) {
        const paramsString = "type=FEAT&type=SSS&type=SRS&type=PSRS&type=WP&downstream=false&limit=500";

        this.props.getNeighbors(category, key, paramsString);
    }

    goDownstream(key, category) {
        const paramsString = "type=FEAT&type=SSS&type=SRS&type=PSRS&type=WP&upstream=false&limit=500";

        this.props.getNeighbors(category, key, paramsString);
    }

    render() {
        const {key, type} = this.props.d;

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
)(ExpandConfiguredMenu);