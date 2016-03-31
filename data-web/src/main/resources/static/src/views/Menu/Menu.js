import React from "react";

import MenuPresentation from "./MenuPresentation";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    handleToggle(value) {
        console.log(value);
        this.props.toggle(value);
    }

    handleValueChange(name, value) {
        this.props.setValue(name, value);
    }

    render() {
        return (
            <MenuPresentation
                toggleHandler={(value) => this.handleToggle(value)}
                valueHandler={(name, value) => this.handleValueChange(name, value)}
                settings={this.props.settings}
            />
        )
    }
}