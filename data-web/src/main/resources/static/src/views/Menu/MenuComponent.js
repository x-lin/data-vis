import React from "react";
import { connect } from "react-redux";

import { toggleSetting, setSettingValue } from "../../actions/action-creators/SettingsActions";
import { CHANGE_GRAPH_LAYOUT } from "../../config/Settings";
import { getNodeTypes } from "../../actions/aggregated/GETNodeTypes";

import Menu from "./Menu";

const mapStateToProps = (state) => {
    const layout = state.settings.reduce((object, value) => {
        if(object.length === 0 && value.name === CHANGE_GRAPH_LAYOUT) {
            return value.value;
        } else {
            return object;
        }
    }, "");

    return {
        settings: state.settings,
        layout
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