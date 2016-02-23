import React from "react";
import ReactDOM from "react-dom";

import ContextMenu from "./ContextMenu";

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

ContextMenuBuilder.removeAll = (selector) => {
    $(selector || ".popover").remove();
};

export default ContextMenuBuilder;