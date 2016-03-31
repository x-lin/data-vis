import React from "react";
import { connect } from "react-redux";

import NewGraph from "./NewGraph";
import { updateGraph, clearGraph } from "../../actions/action-creators/GraphActionCreators";

const mapDispatchProps = (dispatch) => {
    return {
        clearGraph: () => {
            dispatch(clearGraph());
        }
    };
};

export default connect(
    null,
    mapDispatchProps
)(NewGraph);