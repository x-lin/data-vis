import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Popover, Overlay } from "react-bootstrap";

import ContextMenuTitle from "./ContextMenuTitle";
import ContextMenuFooter from "./ContextMenuFooter";
import ContextMenuButtonMenu from "./ContextMenuButtonMenu";
import ExpandMenu from "./ExpandMenu";

import { EXPAND_CONTEXT, STATS_CONTEXT, clearState } from "../../../actions/action-creators/ContextMenuActions";
import { expandNeighbors } from "../../../actions/aggregated/SearchNeighborsActions";

class ContextMenu extends React.Component {
    componentWillUnmount() {
        this.props.clearState();
    }

    getContextObject(context) {
        switch (context) {
            case EXPAND_CONTEXT:
                return (d) => <ExpandMenu d={d} />;
            case STATS_CONTEXT:
                return (d) => <ExpandMenu d={d} />;
            default:
                return () => {};
        }
    }

    render() {
        return (
            <Overlay
              show
              target={() => ReactDOM.findDOMNode(this.props.target)}
              placement="right"
              container={this}
            >
                <Popover title={<ContextMenuTitle d={this.props.d} />}
                  id={this.props.d.key} style={{ borderRadius: "3px", borderTop: "3px solid #d2d6de" }}
                >
                    <div style={{ margin: "-9px -14px" }}>
                        <ContextMenuButtonMenu d={this.props.d} />
                        {this.getContextObject(this.props.context)(this.props.d)}
                        <ContextMenuFooter d={this.props.d} />
                    </div>
                </Popover>
            </Overlay>
        );
    }
}

ContextMenu.propTypes = {
    d: React.PropTypes.object.isRequired,
    target: React.PropTypes.any.isRequired,
    context: React.PropTypes.string.isRequired,
    clearState: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        context: state.contextmenu.context
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        expandNeighbors: (category, key, params) => {
            dispatch(expandNeighbors(category, key, params));
        },
        clearState: () => {
            dispatch(clearState());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(ContextMenu);
