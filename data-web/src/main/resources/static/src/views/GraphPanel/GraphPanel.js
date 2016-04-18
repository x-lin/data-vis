import React from "react";
import { connect } from "react-redux";
import d3 from "d3";

import ForceGraphComponent from "./ForceGraphContainer";
import GraphLegendComponent from "./GraphLegendContainer";
import CircularGraphComponent from "./CircularGraphContainer";
import UndoRedo from "./UndoRedo";
import { CHANGE_GRAPH_LAYOUT, CIRCULAR_LAYOUT, TREE_LAYOUT, FORCE_GRAPH_LAYOUT } from "../../config/Settings";

class D3Panel extends React.Component {
    chooseLayout() {
        switch(this.props.layout) {
            case FORCE_GRAPH_LAYOUT:
                return <ForceGraphComponent divId={"force-graph-component"} />
            case CIRCULAR_LAYOUT:
                return <CircularGraphComponent divId={"force-graph-component"} />
            case TREE_LAYOUT:
                return <ForceGraphComponent divId={"force-graph-component"} />
        }
    }

    render() {
        return (
            <div style={{height: "100%"}}>
                <GraphLegendComponent divId={"graph-legend"}/>
                {this.chooseLayout()}
                <UndoRedo />
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    const layout = state.settings.reduce((object, value) => {
        if(object.length === 0 && value.name === CHANGE_GRAPH_LAYOUT) {
            return value.value;
        } else {
            return object;
        }
    }, "");

    return {
        layout
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        searchNeighbors: (category, key) => {
            dispatch(getNeighbors(category, key));
        }
    };
};

export default connect(
    mapStateToProps,
    null
)(D3Panel);