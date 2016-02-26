import React from "react";

import SettingsSideBarPresentation from "./SettingsSideBarPresentation";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    handleToggle(event) {
        this.props.toggle(event.target.value);
    }

    handleValueChange(name, value) {
        this.props.setValue(name, value);
    }

    render() {
        return (
            <SettingsSideBarPresentation
                toggleHandler={(event) => this.handleToggle(event)}
                valueHandler={(name, value) => this.handleValueChange(name, value)}
                settings={this.props.settings}
            />
        )
    }
}