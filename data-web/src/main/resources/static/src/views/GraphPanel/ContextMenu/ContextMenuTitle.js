import React from "react";

import Constants from "../../../config/Constants";

export default ( { d
    } ) => {
    return (

        <div>
            <span style={{
                    background: Constants.colorMap[d.category],
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    display: "inline-block"
                }} />
            &nbsp;
            <span style={{
                    top: "-2px",
                    position: "relative"
                }}>
                {d.key}
            </span>
        </div>
    );
};