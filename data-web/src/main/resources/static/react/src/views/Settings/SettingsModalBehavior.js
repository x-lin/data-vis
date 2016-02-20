import React from "react";

import SettingsModalPresentation from "./SettingsModalPresent";

export default class extends React.Component {
    handleToggle(event) {
        this.props.toggle(event.target.value);
    }

    render() {
        return (
            <SettingsModalPresentation
                title={"Settings"}
                modalId={this.props.modalId}
                toggleHandler={(event) => this.handleToggle(event)}
                settings={this.props.settings}
            />
        )
    }
}