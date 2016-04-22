import React from "react";
import d3 from "d3";
import { Popover, OverlayTrigger } from "react-bootstrap";
import Header from "../widgets/MenuHeader";
import Label from "../widgets/Label";

import DOMSelector from "../../utils/DOMSelector";

const SCALE = 2;

const PNG = "PNG";
const SVG = "SVG";

class ExportToImage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            format: PNG
        };
    }

    setFormat(format) {
        this.setState({ format });
    }

    convert() {
        const { format } = this.state;

        if (format === PNG) {
            this.convertToPng();
        } else if (format === SVG) {
            this.convertToSvg();
        }
    }

    convertToSvg() {
        const html = d3.select("#force-force")
            .attr("version", 1.1)
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .node().parentNode.innerHTML;

        const blob = new Blob(
            [html],
            { type: "image/svg+xml;charset=utf-8" }
        );

        saveAs(blob, `graph-${Date.now()}.svg`);
    }

    convertToPng() {
        const width = DOMSelector.getWidth("#force-force") * SCALE;
        const height = DOMSelector.getHeight("#force-force") * SCALE;

        const html = d3.select("#force-force")
            .attr("version", 1.1)
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .node();

        const svgString = new XMLSerializer().serializeToString(html);
        const canvas = document.createElement("canvas");
        canvas.setAttribute("width", width.toString());
        canvas.setAttribute("height", height.toString());

        const context = canvas.getContext("2d");
        const DOMURL = self.URL || self.webkitURL || self;

        const img = new Image();
        const svg = new Blob(
            [svgString],
            { type: "image/svg+xml;charset=utf-8" });
        const url = DOMURL.createObjectURL(svg);

        img.onload = () => {
            try {
                context.drawImage(img, 0, 0, width, height);
                canvas.toBlob((blob) => {
                    saveAs(blob, `graph-${Date.now()}.png`);
                });
            } catch (SecurityError) {
                alert("PNG cannot be exported in your browser. If you are using IE, please switch to another browser to export PNG images or export the graph as SVG file.");
            }

        };
        img.src = url;
    }

    render() {
        const { format } = this.state;

        const popover = (
            <Popover id="ExportToImagePopover">
                <div style={{ minWidth: "150px" }}>
                    <Header>Export as</Header>
                    <div className="cursor"
                      style={{ paddingBottom: "5px" }}
                      onClick={() => this.setFormat(PNG)}
                    >
                        <span style={{ marginRight: "5px" }}>PNG</span>
                        <input type="radio" className="pull-right" checked={format === PNG} onChange={() => {}} />
                    </div>
                    <div className="cursor"
                      style={{ paddingBottom: "5px" }}
                      onClick={() => this.setFormat(SVG)}
                    >
                        <span style={{ marginRight: "5px" }}>SVG</span>
                        <input type="radio" className="pull-right" checked={format === SVG} onChange={() => {}} />
                    </div>
                    <button
                      type="button"
                      className="btn bg-navy pull-right"
                      onClick={() => this.convert()}
                      style={{ marginBottom: "5px" }}>
                        Export!
                    </button>
                </div>
            </Popover>
        );

        return (
        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover}>
            <a title="Export as image">
                <span className="fa fa-download" />
                <Label labelClass="label-default"><span className="fa fa-caret-down" /></Label>
            </a>
        </OverlayTrigger>
        );
    }
}

export default ExportToImage;
