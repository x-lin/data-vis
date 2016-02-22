import React from "react";

export default ( {
    onSave,
    onLoad
    } ) => {
    return (
        <div className="row">
            <button type="button" className="btn btn-default" onClick={onSave}>
                <span className="glyphicon glyphicon-floppy-disk"/>
                Save Graph as File
            </button>
            <div className="btn btn-default btn-file">
                <span className="glyphicon glyphicon-open "/>
                <input type="file" onChange={(event) => onLoad(event)} />
                Load Graph File
            </div>
        </div>
    );
};