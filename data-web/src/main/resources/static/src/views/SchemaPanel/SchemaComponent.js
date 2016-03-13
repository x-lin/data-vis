import React from "react";
import { connect } from "react-redux";

import { searchSchema } from "../../actions/aggregated/SearchSchema";
import Schema from "./Schema";
import "./SchemaComponent.css";

const mapStateToProps = (state) => {
    return {
        graph: state.schema,
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        searchSchema: (key) => {
            dispatch(searchSchema(key));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(Schema);