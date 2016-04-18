import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Popover, Overlay } from "react-bootstrap";

import ContextMenuTitle from "./ContextMenuTitle";
import ContextMenuFooter from "./ContextMenuFooter";
import ContextMenuButtonMenu from "./ContextMenuButtonMenu";
import ExpandMenu from "./ExpandMenu";
import StatsMenu from "./StatsMenu";

import { HIDE_CONTEXT, EXPAND_CONTEXT, STATS_CONTEXT } from "../../../actions/action-creators/ContextMenuActions";
import { expandNeighbors } from "../../../actions/aggregated/SearchNeighborsActions";
import { createParams } from "../../../actions/aggregated/SearchNeighborsParams";
import { clearState } from "../../../actions/action-creators/ContextMenuActions";

class ContextMenu extends React.Component {
    componentWillUnmount() {
        this.props.clearState();
    }

    showFeatures(key, category) {
        const params = createParams()
            .addType("FEAT")
            .limit(500)
            .getParams();

        this.props.searchNeighbors(category, key, params);
    }

    getContextObject(context) {
        switch(context) {
            case EXPAND_CONTEXT:
                return (d) => <ExpandMenu d={d} />;
            case STATS_CONTEXT:
                return (d) => <StatsMenu d={d} />;
            default:
                return () => {};
        }
    }

    render() {
        return (
            <Overlay
                show={true}
                target={() => ReactDOM.findDOMNode(this.props.target)}
                placement="right"
                container={this}
            >
                <Popover title={<ContextMenuTitle d={this.props.d}/>}
                         id={this.props.d.key} style={{
                                borderRadius: "3px",
                                borderTop: "3px solid #d2d6de"}}
                        >
                    <div style={{margin: "-9px -14px"}}>
                        <ContextMenuButtonMenu d={this.props.d} />

                        {this.getContextObject(this.props.context)(this.props.d)}

                        <ContextMenuFooter d={this.props.d} />
                    </div>
                </Popover>
            </Overlay>
        );
    }
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
        clearState:() => {
            dispatch(clearState());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(ContextMenu);