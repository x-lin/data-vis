import React from "react";

import SettingsModalPresentation from "./SettingsModalPresentation";

export default class extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props.settings);
    }

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