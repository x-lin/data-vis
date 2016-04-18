import React from "react";

import FileLoadingButton from "../widgets/FileLoadingButton";

const FileLoader = ({ title, handleLoad }) => {
    return (
        <FileLoadingButton
          buttonClass="btn-file"
          iconClass="fa fa-folder-open"
          onChange={(event) => handleLoad(event)}
          title={title}
        />
    );
};

FileLoader.propTypes = {
    handleLoad: React.PropTypes.func.isRequired,
    title: React.PropTypes.string
};

export default FileLoader;
