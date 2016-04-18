import React from "react";
import { connect } from "react-redux";

import FileSaver from "./FileSaver";
import { updateGraph } from "../../actions/action-creators/GraphActions";

const mapStateToProps = (state) => {
    return {
        graph: state.graph.present
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
)(FileSaver);