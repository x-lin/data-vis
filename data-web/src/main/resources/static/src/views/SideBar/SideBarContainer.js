import { connect } from "react-redux";

import { setVisibility, deleteBox } from "../../actions/action-creators/SidebarActions";
import Sidebar from "./Sidebar";

const mapStateToProps = (state) => {
    return {
        data: state.sidebar.data
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        deleteBox: (id) => {
            dispatch(deleteBox(id));
        },
        setPanelInvisible: () => {
            dispatch(setVisibility(false));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(Sidebar);
