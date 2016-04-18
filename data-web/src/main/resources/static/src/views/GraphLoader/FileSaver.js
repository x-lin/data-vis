import React from "react";

const FileSaver = ({ handleSave }) => {
    return (
        <a title="Save Current Graph" onClick={(event) => handleSave(event)}>
            &nbsp;<span className="fa fa-save" />
        </a>
    );
};

FileSaver.propTypes = {
    handleSave: React.PropTypes.func
};

export default FileSaver;
