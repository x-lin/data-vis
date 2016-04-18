import React from "react";
import { connect } from "react-redux";

import FileLoader from "./FileLoader";
import { updateGraph } from "../../actions/action-creators/GraphActions";

const mapStateToProps = (state) => {
    return {
        graph: state.graph
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        updateGraph: (data) => {
            dispatch(updateGraph(data));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(FileLoader);