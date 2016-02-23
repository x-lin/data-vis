import React from "react";

export default ( {
    onSave,
    onLoad
    } ) => {
    return (
        <div>
            <div className="btn-group" role="group" aria-label="Browse at source site">
                <div className="btn-group" role="group">
                    <div className="btn btn-default" onClick={onSave}>
                        <span className="glyphicon glyphicon-floppy-disk"/>
                        Save Graph as File
                    </div>
                </div>
                <div className="btn-group" role="group">
                    <div className="btn btn-default btn-file">
                        <span className="glyphicon glyphicon-open"/>
                        <input type="file" onChange={(event) => onLoad(event)} />
                        Load Graph File
                    </div>
                </div>
            </div>
        </div>
    );
};