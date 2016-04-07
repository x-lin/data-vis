import React from "react";

import Constants from "../../config/Constants";

export default ( { labelClass, bgColor, children } ) => {
    const classes = `label ${labelClass}`;
    const style = bgColor ? {
        backgroundColor: bgColor,
        color: Constants.getContrastColor(bgColor)
    } : {};

    return <span className={classes} style={style}>{children}</span>
};