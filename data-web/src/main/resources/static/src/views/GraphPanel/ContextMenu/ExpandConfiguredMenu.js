import React from "react";
import { connect } from "react-redux";

import { expandNeighbors } from "../../../actions/aggregated/SearchNeighborsActions";
import { createParams } from "../../../actions/aggregated/SearchNeighborsParams";
import { expandNode } from "../../../actions/action-creators/GraphActions";
import { FEAT_DECOMPOSITION } from "../../../config/Defaults";

class ExpandConfiguredMenu extends React.Component {
    goUpstream(key, category) {
        const params = createParams()
            .setTypes(FEAT_DECOMPOSITION)
            .setDownstream(false)
            .setLimit(500)
            .getParams();

        this.props.expandNeighbors(category, key, params);
    }

    goDownstream(key, category) {
        const params = createParams()
            .setTypes(FEAT_DECOMPOSITION)
            .setUpstream(false)
            .setLimit(500)
            .getParams();

        this.props.expandNeighbors(category, key, params);
    }

    render() {
        const { key, type } = this.props.d;

        return (
            <div>
                <div
                  className="dropdown-content-item dropdown-content-item-hover cursor"
                  onClick={() => this.goUpstream(key, type)}
                >
                    <span className="fa fa-long-arrow-up" />
                    &nbsp;Upstr. Feature Decomposition
                </div>
                <div
                  className="dropdown-content-item dropdown-content-item-hover cursor"
                  onClick={() => this.goDownstream(key, type)}
                >
                    <span className="fa fa-long-arrow-down" />
                    &nbsp;Downstr. Feature Decomposition
                </div>
            </div>
        );
    }
}

ExpandConfiguredMenu.propTypes = {
    d: React.PropTypes.object.isRequired,
    expandNeighbors: React.PropTypes.func.isRequired
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
    null,
    mapDispatchProps
)(ExpandConfiguredMenu);
