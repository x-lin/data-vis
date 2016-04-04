import ReactDOM from "react-dom";

import ContextMenuBuilder from "./ContextMenu/ContextMenuBuilder";

const EventHandlers = {};

let isContextOpen = false;

EventHandlers.onClickSvg = () => {
    isContextOpen = false;
};

EventHandlers.onMouseOver = (d) => {
    d3.event.preventDefault();

    if(!isContextOpen) {
        const popoverEl = ContextMenuBuilder.buildElement(d.key, d.category);
        ContextMenuBuilder.createAndShowTooltip(popoverEl, d);
    }
};

EventHandlers.onMouseLeave = (d) => {
    ContextMenuBuilder.removeTooltip();
    //ContextMenuBuilder.removePopup();
};

EventHandlers.onZoomSvg = (panelElement) => {
    ContextMenuBuilder.removePopup();
    isContextOpen = false;
    panelElement.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
};

EventHandlers.onContextMenuNode = (d, props) => {
    d3.event.preventDefault();

    isContextOpen = true;
    ContextMenuBuilder.removeTooltip();
    const popoverEl = ContextMenuBuilder.buildElement(d.key, d.category);
    ContextMenuBuilder.createAndShow(popoverEl, d, props);
};

EventHandlers.onDoubleClickNode = (d, props) => {
    d3.event.stopPropagation();
    if(d.count - d.weight > 0) {
        props.searchNeighbors(d.category, d.key);
    }
};

EventHandlers.onDragStartNode = (d) => {
    d3.event.sourceEvent.stopPropagation();
    //ContextMenuBuilder.removeTooltip();
    ContextMenuBuilder.removePopup();
    isContextOpen = false;
    d.fixed = true;
    d.isFixed = true;
};

EventHandlers.onDragEndNode = (d) => {
    if(!isContextOpen) {
        const popoverEl = ContextMenuBuilder.buildElement(d.key, d.category);
        ContextMenuBuilder.createAndShowTooltip(popoverEl, d);
    }
};

EventHandlers.onDragNode = (d) => {
    ContextMenuBuilder.removeTooltip();
};

export default EventHandlers;