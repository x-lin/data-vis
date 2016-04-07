import React from "react";
import ReactDOM from "react-dom";

import ContextMenu from "./ContextMenu";
import Tooltip from "../../widgets/Tooltip";
import ProviderWrapper from "../../../stores/ProviderWrapper";
import { Provider } from "react-redux";
import { store } from "../../../stores/ReduxStore";

const ContextMenuBuilder = {};

ContextMenuBuilder.buildElement = (key, category) => {
    return $("#" + ContextMenuBuilder.buildElementId(key, category));
};

ContextMenuBuilder.buildElementId = (key, category) => {
    return "g" + key.replace(/^[^a-z]+|[^\w-]+/gi, "") + category;
};

ContextMenuBuilder.createAndShow = (element, d, props) => {
    ReactDOM.render (
        <ProviderWrapper>
            <ContextMenu d={d} target={element[0]} {...props} />
        </ProviderWrapper>,
        $("#popover-content")[0]
    );

    //close popover on outside click
    $('body').on('click', function (e) {
        $('#popover-content').each(function () {
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                ContextMenuBuilder.removePopup();
            }
        });
    });

    return element;
};

ContextMenuBuilder.createAndShowTooltip = (element, d) => {
    ReactDOM.render (
        <Tooltip tooltip={d.name} target={element[0]} />,
        $("#tooltip-content")[0]
    );

    return element;
};

ContextMenuBuilder.removeTooltip = (selector) => {
    ReactDOM.unmountComponentAtNode($("#tooltip-content")[0]);
}

ContextMenuBuilder.removePopup = (selector) => {
    ReactDOM.unmountComponentAtNode($("#popover-content")[0]);
};

export default ContextMenuBuilder;