import React from "react";
import { connect } from "react-redux";
import { MenuItem, Dropdown, ButtonGroup } from "react-bootstrap";

import Constants from "../../../config/Constants";
import { HIDE_CONTEXT, EXPAND_CONTEXT, STATS_CONTEXT } from "../../../actions/action-creators/ContextMenuActions";
import { searchTestCoverage } from "../../../actions/aggregated/SearchTestCoverageActions";
import { activateContext, deactivateContext, clearState } from "../../../actions/action-creators/ContextMenuActions";
import { removeFromGraph } from "../../../actions/action-creators/GraphActions";
import ContextMenuBuilder from "./ContextMenuBuilder";

class ContextMenuButtonMenu extends React.Component {
    showTestCoverage(d) {
        this.props.searchTestCoverage(d);
    }

    removeNode(key) {
        this.props.removeFromGraph(key);
        ContextMenuBuilder.removePopup();
    }

    render() {
        const { activateContext, context, d } = this.props;

        return <ButtonGroup justified>
            <a type="button" className={`btn btn-app ${context === EXPAND_CONTEXT && "active"}`} title="Expand node" onClick={() => {activateContext(EXPAND_CONTEXT)}}>
                <span className="fa fa-plus" />
                Expand
            </a>
            <a type="button" className="btn btn-app" title="Remove node from panel" onClick={(key) => {this.removeNode(d.key)}}>
                <span className="fa fa-remove" />
                Remove
            </a>
            <a type="button" className={`btn btn-app ${context === STATS_CONTEXT && "active"} disabled`} title="Statistics" onClick={() => {activateContext(STATS_CONTEXT)}}>
                <span className="fa fa-bar-chart" />
                Stats
            </a>

            <Dropdown id="more-options-menu">
                <a bsRole="toggle" className="btn btn-app dropdown-toggle" title="More options" dataToggle="dropdown">
                    <span className="fa fa-ellipsis-h" />
                    More
                </a>

                <Dropdown.Menu>
                    <MenuItem eventKey="1" onSelect={() => this.showTestCoverage(d)}><strong>TC</strong>&nbsp; Test Coverage</MenuItem>
                </Dropdown.Menu>
            </Dropdown>
        </ButtonGroup>
    }
}

const mapStateToProps = (state) => {
    return {
        context: state.contextmenu.context
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        searchTestCoverage: (node) => {
            dispatch(searchTestCoverage(node));
        },
        activateContext: (context) => {
            dispatch(activateContext(context));
        },
        deactivateContext: () => {
            dispatch(deactivateContext());
        },
        removeFromGraph: (key) => {
            dispatch(removeFromGraph(key));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(ContextMenuButtonMenu);
