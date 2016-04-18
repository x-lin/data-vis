import React from "react";

import { DEFAULT_COLOR } from "../../config/Settings";

const CircleSpan = ({
    color,
    radius
    }) => {
    return (
        <span style={{
            background: color || DEFAULT_COLOR,
            width: radius,
            height: radius,
            borderRadius: "50%",
            display: "inline-block"
        }}
        />
    );
};

CircleSpan.propTypes = {
    color: React.PropTypes.string,
    radius: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ])
};

export default CircleSpan;
