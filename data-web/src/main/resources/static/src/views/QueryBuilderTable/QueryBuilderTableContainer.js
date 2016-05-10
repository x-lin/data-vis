import { connect } from "react-redux";

import { searchNeighbors } from "../../actions/aggregated/SearchNeighborsActions";
import QueryBuilderTable from "./QueryBuilderTable";

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
)(QueryBuilderTable);
