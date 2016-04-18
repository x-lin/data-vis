import React from "react";

import Constants from "../../config/Constants";

const Label = ({ labelClass, bgColor, children }) => {
    const classes = `label ${labelClass}`;
    const style = bgColor ? {
        backgroundColor: bgColor,
        color: Constants.getContrastColor(bgColor)
    } : {};

    return <span className={classes} style={style}>{children}</span>;
};

Label.propTypes = {
    labelClass: React.PropTypes.string,
    bgColor: React.PropTypes.string,
    children: React.PropTypes.node
};

export default Label;
