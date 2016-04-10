import React from "react";
import { connect } from "react-redux";

import d3 from "d3";
import { store } from "../../stores/ReduxStore";

import ForceGraphComponent from "./ForceGraphComponent";
import GraphLegendComponent from "./GraphLegendComponent";
import "./GraphLegend.css";
import "./ForceGraphComponent.css"
import { undoGraphAction, redoGraphAction } from "../../actions/action-creators/GraphActionCreators";

class UndoRedo extends React.Component {
    renderUndo() {
        if(this.props.past.length > 0) {
            return <button className="btn btn-default btn-flat btn-lg" onClick={() => this.props.undoGraphAction()}>
                <span className="fa fa-undo"/>
            </button>;
        } else {
            return (<button className="btn btn-default btn-flat btn-lg disabled">
                <span className="fa fa-undo"/>
            </button>);
        }
    }

    renderRedo() {
        if(this.props.future.length > 0) {
            return (<button className="btn btn-default btn-flat btn-lg" onClick={() => this.props.redoGraphAction()}>
                <span className="fa fa-repeat"/>
            </button>);
        } else {
            return (<button className="btn btn-default btn-flat btn-lg disabled">
                <span className="fa fa-repeat"/>
            </button>);
        }
    }

    render() {
        return <div style={{bottom: "20px", left: "20px", position: "absolute", zIndex: "10"}}>
            {this.renderUndo()}
            {this.renderRedo()}
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        past: state.graph.past,
        future: state.graph.future
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        undoGraphAction: () => {
            dispatch(undoGraphAction());
        },
        redoGraphAction: () => {
            dispatch(redoGraphAction());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(UndoRedo);