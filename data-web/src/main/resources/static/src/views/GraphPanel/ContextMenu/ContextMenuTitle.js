import React from "react";

import Constants from "../../../config/Constants";
import CircleSpan from "../../widgets/CircleSpan";

export default ( { d
    } ) => {
    return (

        <div>
            <CircleSpan radius="8px" color={Constants.getColor(d.type)} />
            &nbsp;
            <span style={{
                    position: "relative"
                }}>
                {d.name}
            </span>
        </div>
    );
};