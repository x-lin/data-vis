import React from "react";
import { connect } from "react-redux";

import { toggleSetting, setSettingValue } from "../../actions/action-creators/SettingsActions";
import { getNodeTypes } from "../../actions/aggregated/GETNodeTypes";

import Menu from "./Menu";

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
        },
        getNodeTypes: () => {
            dispatch(getNodeTypes())
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(Menu);