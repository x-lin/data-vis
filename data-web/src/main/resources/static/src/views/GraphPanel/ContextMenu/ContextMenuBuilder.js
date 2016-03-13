import React from "react";
import ReactDOM from "react-dom";

import ContextMenu from "./ContextMenu";
import Tooltip from "../../widgets/Tooltip";

const ContextMenuBuilder = {};

ContextMenuBuilder.buildElement = (key, category) => {
    return $("#" + ContextMenuBuilder.buildElementId(key, category));
};

ContextMenuBuilder.buildElementId = (key, category) => {
    return "g" + key.replace(/^[^a-z]+|[^\w-]+/gi, "") + category;
};

ContextMenuBuilder.createAndShow = (element, d) => {
    ReactDOM.render (
        <ContextMenu d={d} target={element[0]} />,
        $("#popover-content")[0]
    );

    return element;
};

ContextMenuBuilder.createAndShowTooltip = (element, d) => {
    //ReactDOM.render (
    //    <Tooltip d={d} target={element[0]} />,
    //    $("#popover-content")[0]
    //);
    //
    //return element;
};

ContextMenuBuilder.removeAll = (selector) => {
    $(selector || ".popover").remove();
    //$(selector || ".tooltip").remove();
};

export default ContextMenuBuilder;