import React from "react";
import { connect } from "react-redux";

import ForceGraphComponent from "./ForceGraphContainer";
import GraphLegendComponent from "./GraphLegendContainer";
import CircularGraphComponent from "./CircularGraphContainer";
import UndoRedoContainer from "./UndoRedoContainer";
import { CHANGE_GRAPH_LAYOUT, CIRCULAR_LAYOUT, FORCE_GRAPH_LAYOUT } from "../../config/Settings";

class GraphPanel extends React.Component {
    chooseLayout() {
        switch (this.props.layout) {
            case FORCE_GRAPH_LAYOUT:
                return <ForceGraphComponent divId={"force-graph-component"} />;
            case CIRCULAR_LAYOUT:
                return <CircularGraphComponent divId={"force-graph-component"} />;
            default:
                return <ForceGraphComponent divId={"force-graph-component"} />;
        }
    }

    render() {
        return (
            <div style={{ height: "100%" }}>
                <GraphLegendComponent divId={"graph-legend"} />
                    {this.chooseLayout()}
                <UndoRedoContainer />
            </div>
        );
    }
}

GraphPanel.propTypes = {
    layout: React.PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
    const layout = state.settings.reduce((object, value) => {
        if (object.length === 0 && value.name === CHANGE_GRAPH_LAYOUT) {
            return value.value;
        } else {
            return object;
        }
    }, "");

    return {
        layout
    };
};

export default connect(
    mapStateToProps,
    null
)(GraphPanel);
