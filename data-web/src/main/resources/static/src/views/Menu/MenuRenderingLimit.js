import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";

import MenuExpandLabel from "./MenuExpandLabel";
import NeighborExpansionContainer from "./NeighborExpansionContainer";
import Header from "../widgets/MenuHeader";

const MenuLanePicker = () => {
    const popover = (<Popover id={"neighborexpansion"}>
        <Header>Single Rendering Limit</Header>
        <NeighborExpansionContainer />
    </Popover>);

    return (
        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover}>
            <a title="Limit for rendering of neighbor nodes">
                <span className="fa fa-pencil-square-o" />
                <MenuExpandLabel />
            </a>
        </OverlayTrigger>
    );
};

export default MenuLanePicker;
