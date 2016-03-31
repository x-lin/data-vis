import React from "react";

import FileLoadingButton from "../widgets/FileLoadingButton";

export default class extends React.Component {
    handleSave(event) {
        const blob = new Blob([JSON.stringify(this.props.graph)], {type: "text/plain;charset=utf-8"});
        const filename = `graph-${Date.now()}.json`;
        saveAs(blob, filename);
    }

    render() {
        return <a title="Save Current Graph" onClick={(event) => this.handleSave(event)}>&nbsp;<span className="fa fa-save" /></a>
    }
}