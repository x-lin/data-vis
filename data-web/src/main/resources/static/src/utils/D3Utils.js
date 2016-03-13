import d3 from "d3";

import DOMSelector from "./DOMSelector";

const MIN_ZOOM = 0.05;
const MAX_ZOOM = 8;
const DEFAULT_SCALE = 1;
const DEFAULT_TRANSLATE = [0,0];

const D3Utils = {};

D3Utils.createZoom = (scale, translate) => {
    return d3.behavior
        .zoom()
        .scaleExtent([MIN_ZOOM, MAX_ZOOM])
        .scale(scale || DEFAULT_SCALE)
        .translate(translate || DEFAULT_TRANSLATE);
};

D3Utils.createSvg = (selector) => {
    return d3.select(selector).append("svg")
        .attr("width", DOMSelector.getWidth(selector))
        .attr("height", DOMSelector.getHeight(selector));
};

D3Utils.moveLinks = (links) => {
    links.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
};

D3Utils.moveNodes = (nodes) => {
    nodes
        .attr("transform", d => `translate(${d.x},${d.y})`);
};

export default D3Utils;