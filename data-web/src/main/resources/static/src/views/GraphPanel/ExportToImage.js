import React from "react";
import d3 from "d3";

import DOMSelector from "../../utils/DOMSelector";

const SCALE = 2;

class ExportToImage extends React.Component {
    convert() {
        const html = d3.select("#force-force")
            .attr("version", 1.1)
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .node().parentNode.innerHTML;

        const base64 = btoa(html.replace(/[\u00A0-\u2666]/g, (c) => {
            return `&#${c.charCodeAt(0)};`;
        }));


        const width = DOMSelector.getWidth("#force-force") * SCALE;
        const height = DOMSelector.getHeight("#force-force") * SCALE;

        const imgsrc = `data:image/svg+xml;base64,${base64}`;

        const canvas = document.createElement("canvas");
        canvas.setAttribute("width", width.toString());
        canvas.setAttribute("height", height.toString());

        const image = new Image();
        image.src = imgsrc;
        image.onload = () => {
            const context = canvas.getContext("2d")
            context.drawImage(image, 0, 0, width, height);

            const a = document.createElement("a");
            a.download = `graph-${Date.now()}.png`;
            a.href = canvas.toDataURL("image/png");
            a.click();
        };
    }

    render() {
        return (
            <a href="#" title="Export as image" onClick={() => this.convert()}><span className="fa fa-download" /></a>
        );
    }
}

export default ExportToImage;
