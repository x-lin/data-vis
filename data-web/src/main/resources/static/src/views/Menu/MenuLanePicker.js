import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";

import LanePicker from "../LanePicker/LanePicker";
import MenuExpandLabel from "./MenuExpandLabel";

const MenuLanePicker = () => {
    const popover = (<Popover id={"lanepicker"}>
        <div style={{ height: $(document).height() - 100 }}>
            <LanePicker />
        </div>
    </Popover>);

    return (
        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover}>
            <a title="Group items">
                <span className="fa fa-building-o" />
                <MenuExpandLabel />
            </a>
        </OverlayTrigger>
    );
};

export default MenuLanePicker;
