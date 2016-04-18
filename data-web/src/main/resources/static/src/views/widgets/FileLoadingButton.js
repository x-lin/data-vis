import React from "react";

const FileLoadingButton = ({
    buttonClass,
    iconClass,
    onChange,
    title
}) => {
    return (
        <div className={buttonClass}>
            <span className={iconClass} />
            <input type="file" onChange={onChange} /> &nbsp;
            {title}
        </div>
    );
};

FileLoadingButton.propTypes = {
    buttonClass: React.PropTypes.string,
    iconClass: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    title: React.PropTypes.string
};

export default FileLoadingButton;
