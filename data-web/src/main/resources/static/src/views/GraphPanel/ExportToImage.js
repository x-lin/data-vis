import React from "react";
import d3 from "d3";

import SearchBar from "./../SearchBar/SearchBarContainer";
import GraphPanel from "./GraphPanel";
import { connect } from "react-redux";

import DOMSelector from "../../utils/DOMSelector";

class ExportToImage extends React.Component {
    convert() {
        const html = d3.select("#force-force")
            .attr("version", 1.1)
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .node().parentNode.innerHTML;

        const imgsrc = `data:image/svg+xml;base64,${btoa(html)}`;

        const canvas = document.createElement("canvas");
        canvas.setAttribute("width", DOMSelector.getWidth("#force-force"));
        canvas.setAttribute("height", DOMSelector.getHeight("#force-force"));

        const image = new Image();
        image.src = imgsrc;
        image.onload = () => {
            canvas.getContext("2d").drawImage(image, 0, 0);

            const a = document.createElement("a");
            a.download = `graph-${Date.now()}.png`;
            a.href = canvas.toDataURL("image/png");
            a.click();
        };
    }

    render() {
        return (
            <a href="#" title="Export as image" onClick={() => this.convert()}><span className="fa  fa-download" /></a>
        );
    };
}

export default ExportToImage;
