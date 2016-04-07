import React from "react";
import { connect } from "react-redux";

import { attachToLane, move } from "../../actions/action-creators/LaneActions";
import Lanes from "./Lanes.js";

const mapStateToProps = (state) => {
    return {
        lanes: state.lanes.lanes
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        attachToLane: (laneId, note) => {
            dispatch(attachToLane(laneId, note));
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