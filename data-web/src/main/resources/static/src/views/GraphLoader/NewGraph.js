import React from "react";

import FileLoadingButton from "../widgets/FileLoadingButton";

export default class extends React.Component {
    handleClick() {
        this.props.clearGraph();
    }

    render() {
        return <a onClick={() => this.handleClick()}><i className="fa fa-file-o" /></a>
    }
}