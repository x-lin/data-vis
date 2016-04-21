import { connect } from "react-redux";

import { searchNeighbors } from "../../actions/aggregated/SearchNeighborsActions";
import RelatedBugsTable from "./RelatedBugsTable";

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        searchNeighborsStart: (category, key) => {
            dispatch(searchNeighbors(category, key));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(RelatedBugsTable);
