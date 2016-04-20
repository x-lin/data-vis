import { connect } from "react-redux";

import { setVisibility, addReactComponent, deleteBox } from "../../actions/action-creators/SidebarActions";
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
        },
        addReactComponent: (index, object) => {
            dispatch(addReactComponent(index, object));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(Sidebar);
