import { connect } from "react-redux";

import { synchronizeGraph } from "../../actions/aggregated/SynchronizeActions";

import Synchronize from "./Synchronize";

const mapDispatchProps = (dispatch) => {
    return {
        synchronize: () => {
            dispatch(synchronizeGraph());
        }
    };
};

export default connect(
    null,
    mapDispatchProps
)(Synchronize);
