import React from "react";

class UndoRedo extends React.Component {
    renderUndo() {
        const { past, undoGraphAction } = this.props;

        return (
            <button
              className={`btn btn-default btn-flat btn-lg ${past.length > 0 ? "" : "disabled"}`}
              onClick={past.length > 0 ? () => undoGraphAction() : null}
            >
                <span className="fa fa-undo" />
            </button>
        );
    }

    renderRedo() {
        const { future, redoGraphAction } = this.props;

        return (
            <button
              className={`btn btn-default btn-flat btn-lg ${future.length > 0 ? "" : "disabled"}`}
              onClick={future.length > 0 ? () => redoGraphAction() : null}
            >
                <span className="fa fa-repeat" />
            </button>
        );
    }

    render() {
        return (
            <div style={{ bottom: "20px", left: "20px", position: "absolute", zIndex: "10" }}>
                {this.renderUndo()}
                {this.renderRedo()}
            </div>
        );
    }
}

UndoRedo.propTypes = {
    future: React.PropTypes.array.isRequired,
    past: React.PropTypes.array.isRequired,
    redoGraphAction: React.PropTypes.func.isRequired,
    undoGraphAction: React.PropTypes.func.isRequired
};

export default UndoRedo;
