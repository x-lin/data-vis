import React from "react";
import { connect } from "react-redux";

import { toggleSetting } from "../../actions/action-creators/SettingsActions"

import SettingsModal from "./SettingsModal";

const mapStateToProps = (state) => {
    return {
        settings: state.settings
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        toggle: (name) => {
            dispatch(toggleSetting(name));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(SettingsModal);