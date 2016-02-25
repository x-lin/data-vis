import React from "react";

export default ( {
    onSave,
    onLoad
    } ) => {
    return (
        <div>
            <ul className="sidebar-menu">
                <li className="header"><span className="fa  fa-file-text"></span>&nbsp; Save/Load Graph</li>
            </ul>


            <div className="btn btn-block sidebar-button" onClick={onSave}>
                <span className="fa fa-save"/> &nbsp;
                Save Graph to File
            </div>

            <div className="btn btn-block btn-file sidebar-button">
                <span className="fa fa-upload"/>
                <input type="file" onChange={(event) => onLoad(event)} /> &nbsp;
                Load Graph from File
            </div>
        </div>
    );
};