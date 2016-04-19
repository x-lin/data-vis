import { connect } from "react-redux";

import UndoRedo from "./UndoRedo";
import { undoGraphAction, redoGraphAction } from "../../actions/action-creators/GraphActions";

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
