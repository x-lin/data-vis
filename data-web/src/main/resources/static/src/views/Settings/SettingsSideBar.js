import React from "react";

import SettingsSideBarPresentation from "./SettingsSideBarPresentation";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    handleToggle(event) {
        this.props.toggle(event.target.value);
    }

    render() {
        return (
            <SettingsSideBarPresentation
                toggleHandler={(event) => this.handleToggle(event)}
                settings={this.props.settings}
            />
        )
    }
}