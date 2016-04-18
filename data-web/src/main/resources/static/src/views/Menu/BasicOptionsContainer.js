import { connect } from "react-redux";

import { setFilterValue } from "../../actions/action-creators/LaneActions";

import BasicOptions from "./BasicOptions";

const mapStateToProps = (state) => {
    return {
        upstream: state.lanes.filters.upstream,
        downstream: state.lanes.filters.downstream,
        limit: state.lanes.filters.limit
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        setFilterValue: (name, value) => {
            dispatch(setFilterValue(name, value));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(BasicOptions);
