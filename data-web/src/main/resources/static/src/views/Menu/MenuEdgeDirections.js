import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";

import MenuExpandLabel from "./MenuExpandLabel";
import BasicOptionsComponent from "./BasicOptionsContainer";
import Header from "../widgets/MenuHeader";

const MenuLanePicker = () => {
    const popover = (<Popover id={"basicoptions"}>
        <Header>Edge Directions</Header>
            <BasicOptionsComponent />
    </Popover>);

    return (
        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover}>
            <a title="Edge directions">
                <span className="fa fa-exchange" />
                <MenuExpandLabel />
            </a>
        </OverlayTrigger>
    );
};

export default MenuLanePicker;
