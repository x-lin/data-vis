import React from "react";
import { connect } from "react-redux";

import { attachToLane, move } from "../../actions/action-creators/LaneActions";
import Lanes from "./Lanes.js";

const mapStateToProps = (state) => {
    return {
        lanes: state.lanes
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        attachToLane: (laneId, noteId) => {
            dispatch(attachToLane(laneId, noteId));
        },
        move: (sourceId, targetId) => {
            dispatch(move(sourceId, targetId))
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(Lanes);