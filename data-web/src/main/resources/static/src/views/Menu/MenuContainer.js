import React from "react";
import { connect } from "react-redux";

import { toggleSetting, setSettingValue } from "../../actions/action-creators/SettingsActions";
import { CHANGE_GRAPH_LAYOUT } from "../../config/Settings";

import Menu from "./Menu";

class MenuContainer extends React.Component {
    handleToggle(value) {
        this.props.toggle(value);
    }

    handleValueChange(name, value) {
        this.props.setValue(name, value);
    }

    render() {
        return (
            <Menu
              toggleHandler={(value) => this.handleToggle(value)}
              valueHandler={(name, value) => this.handleValueChange(name, value)}
              settings={this.props.settings}
              layout={this.props.layout}
            />
        );
    }
}

MenuContainer.propTypes = {
    toggle: React.PropTypes.func.isRequired,
    setValue: React.PropTypes.func.isRequired,
    settings: React.PropTypes.any.isRequired,
    layout: React.PropTypes.any.isRequired
};

const mapStateToProps = (state) => {
    const layout = state.settings.reduce((object, value) => {
        if (object.length === 0 && value.name === CHANGE_GRAPH_LAYOUT) {
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
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(MenuContainer);
