import React from "react";

import MenuPresentation from "./MenuPresentation";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getNodeTypes();
    }

    handleToggle(value) {
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