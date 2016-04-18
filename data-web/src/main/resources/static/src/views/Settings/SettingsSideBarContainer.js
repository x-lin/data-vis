import React from "react";
import { connect } from "react-redux";

import { toggleSetting, setSettingValue } from "../../actions/action-creators/SettingsActions"

import SettingsSideBar from "./SettingsSideBar";

const mapStateToProps = (state) => {
    return {
        settings: state.settings
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        toggle: (name) => {
            dispatch(toggleSetting(name));
        },
        setValue: (name, value) => {
            dispatch(setSettingValue(name, value));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(SettingsSideBar);