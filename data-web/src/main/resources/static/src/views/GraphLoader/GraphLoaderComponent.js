import React from "react";
import { connect } from "react-redux";

import GraphLoader from "./GraphLoader";
import { updateGraph } from "../../actions/action-creators/GraphActionCreators";

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
)(GraphLoader);