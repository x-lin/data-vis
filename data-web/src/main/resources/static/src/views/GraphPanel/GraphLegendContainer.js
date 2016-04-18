import React from "react";
import { connect } from "react-redux";

import { toggleFilterItemCategory } from "../../actions/action-creators/GraphFilterActions";

import GraphLegend from "./GraphLegend";

const GraphLegendContainer = ({
    toggleFilterItemCategory,
    visibilityFilters,
    legend,
    divId
}) => {
    return (
        <GraphLegend
          toggleFilterItemCategory={(name) => toggleFilterItemCategory(name)}
          visibilityFilters={visibilityFilters}
          legend={legend}
          divId={divId}
        />
    );
};

GraphLegendContainer.propTypes = {
    toggleFilterItemCategory: React.PropTypes.func.isRequired,
    visibilityFilters: React.PropTypes.object.isRequired,
    legend: React.PropTypes.object.isRequired,
    divId: React.PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
    return {
        visibilityFilters: state.visibilityFilters,
        legend: state.graph.present
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        toggleFilterItemCategory: (category) => {
            dispatch(toggleFilterItemCategory(category));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(GraphLegendContainer);
