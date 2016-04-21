import { connect } from "react-redux";

import { searchNeighbors } from "../../actions/aggregated/SearchNeighborsActions";
import { setVisibility } from "../../actions/action-creators/SidebarActions";
import TestCoverageTable from "./TestCoverageTable";

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        searchNeighborsStart: (category, key) => {
            dispatch(searchNeighbors(category, key));
        },
        setPanelInvisible: () => {
            dispatch(setVisibility(false));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(TestCoverageTable);
