import ReactDOM from "react-dom";

const EventHandlers = {};

EventHandlers.onClickSvg = () => {
    //ContextMenuBuilder.removeAll();
};

EventHandlers.onZoomSvg = (panelElement) => {
    //ContextMenuBuilder.removeAll();
    panelElement.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
};

EventHandlers.onContextMenuNode = (d) => {
    d3.event.preventDefault();
    //
    //const popoverEl = ContextMenuBuilder.buildElement(d.key, d.category);
    //ContextMenuBuilder.createAndShow(popoverEl, d);
};

EventHandlers.onDoubleClickNode = (d, props) => {
    d3.event.stopPropagation();
    //props.searchNeighbors(d.category, d.key);
};

EventHandlers.onDragStartNode = (d) => {
    d3.event.sourceEvent.stopPropagation();
    //ContextMenuBuilder.removeAll();
    d.fixed = true;
    d.isFixed = true;
};

export default EventHandlers;