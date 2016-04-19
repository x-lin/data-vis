import React from "react";

import Constants from "../../../config/Constants";
import Label from "../../widgets/Label";

const ContextMenuTitle = ({ d }) => {
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

ContextMenuTitle.propTypes = {
    d: React.PropTypes.object.isRequired
};

export default ContextMenuTitle;
