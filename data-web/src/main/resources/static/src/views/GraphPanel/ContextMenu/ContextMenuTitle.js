import React from "react";

import Constants from "../../../config/Constants";
import CircleSpan from "../../widgets/CircleSpan";
import Label from "../../widgets/Label";

export default ( { d
    } ) => {
    return (

        <div>
            <p>
                {d.status && <span><Label labelClass="label-default">{d.status}</Label><span>&nbsp;</span></span>}

                <Label bgColor={Constants.getColor(d.type)}>{d.type}</Label>
            </p>
            <p><strong>{d.name}</strong></p>
        </div>
    );
};