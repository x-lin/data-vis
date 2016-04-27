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

    createBlob(width, height) {
        const svg1 = document.getElementById("force-force").cloneNode(true);
        svg1.setAttribute("width", width);
        svg1.setAttribute("height", height);

        const svg2 = document.getElementById("graph-legend").cloneNode(true);
        svg1.appendChild(svg2);

        const svgString = new XMLSerializer().serializeToString(svg1);

        return new Blob(
            [svgString],
            { type: "image/svg+xml;charset=utf-8" });
    }

    convertToSvg() {
        const width = DOMSelector.getWidth("#force-force");
        const height = DOMSelector.getHeight("#force-force");

        const blob = this.createBlob(width, height);

        saveAs(blob, `graph-${Date.now()}.svg`);
    }

    convertToPng() {
        const width = DOMSelector.getWidth("#force-force");
        const height = DOMSelector.getHeight("#force-force");

        const blob = this.createBlob(width, height);

        const scaleWidth = width * SCALE;
        const scaleHeight = height * SCALE;

        const canvas = document.createElement("canvas");
        canvas.setAttribute("width", scaleWidth.toString());
        canvas.setAttribute("height", scaleHeight.toString());

        const context = canvas.getContext("2d");
        const DOMURL = self.URL || self.webkitURL || self;

        const img = new Image();
        img.src = DOMURL.createObjectURL(blob);

        img.onload = () => {
            try {
                context.drawImage(img, 0, 0, scaleWidth, scaleHeight);
                canvas.toBlob((blob) => {
                    saveAs(blob, `graph-${Date.now()}.png`);
                });
            } catch (SecurityError) {
                alert("PNG cannot be exported in your browser. If you are using IE, please switch to another browser or export the graph as SVG file.");
            }
        };
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
                      style={{ marginBottom: "5px" }}
                    >
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
