import React from "react";

import FileLoadingButton from "../widgets/FileLoadingButton";

export default ( {
    onSave,
    onLoad
    } ) => {
    return (
        <div>
            <FileLoadingButton
                buttonClass="btn btn-block btn-file sidebar-button"
                iconClass="fa fa-upload"
                onChange={(event) => onLoad(event)}
                title="Load Graph"
            />

            <div className="btn btn-block sidebar-button" onClick={onSave}>
                <span className="fa fa-save"/> &nbsp;
                Save Graph
            </div>
        </div>
    );
};