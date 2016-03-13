import React from "react";

export default ( {
    color,
    radius
    } ) => {

    return (
    <span style={{
          background: color,
          width: radius,
          height: radius,
          borderRadius: "50%",
          display: "inline-block"
        }} />
    );
};

