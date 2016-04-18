import React from "react";

import SearchBar from "./../SearchBar/SearchBarContainer";
import D3Panel from "./GraphPanel";

class ExportToImage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageData: ""
        }
    };

    convert() {
        console.log("rendering image");
        var svg = document.getElementById('d3box');
        var svgData = new XMLSerializer().serializeToString( svg );

        var canvas = document.createElement( "canvas" );

        var svgSize = svg.getBoundingClientRect();
        canvas.width = svgSize.width;
        canvas.height = svgSize.height;

        var ctx = canvas.getContext( "2d" );

        var img = document.createElement("img");


        img.onload = () => {
            console.log("d rawi ng image ");
            console.log(img);

            ctx.drawImage(img, 0, 0);
            var imgsrc = canvas.toDataURL("image/png");
            console.log(imgsrc);

            var a = document.createElement("a");
            a.download = container+".png";
            a.href = imgsrc;
            a.click();
        };
    img.setAttribute("onload", () => {
        console.log("d rawi ng image ");
        console.log(img);

        ctx.drawImage(img, 0, 0);
        var imgsrc = canvas.toDataURL("image/png");
        console.log(imgsrc);

        var a = document.createElement("a");
        a.download = container+".png";
        a.href = imgsrc;
        a.click();
    })
        img.setAttribute("src", "data:image/svg+xml;base64," + btoa(svgData))


        //ctx.drawImage(img, 0, 0);
        //
        //
        //
        ////svg sofar
        //console.log("data:image/svg+xml;base64," + btoa(svgData))



        //img.setAttribute( "src", "data:image/svg+xml;base64," + btoa( svgData ) );
        //
        //img.onload = function() {
        //    ctx.drawImage(img, 0, 0);
        //    this.setState({imageDate: canvas.toDataURL("image/png")});
        //};

        //var svg  = document.getElementById('d3box'),
        //    xml  = new XMLSerializer().serializeToString(svg),
        //    data = "data:image/svg+xml;base64," + btoa(xml),
        //    img = new Image();
        //console.log(data)
        //    this.setState({imageData: "data:image/svg+xml;base64," + btoa(xml)});
    }

    render() {
        return (
            <div>
                <button className="btn  btn-default" onClick={() => this.convert()}>
                    <span className="glyphicon glyphicon-search " aria-hidden="true"></span>&nbsp;
                </button>
                <canvas></canvas>
                <img src="#"></img>
                {this.state.imageData && <img src={this.state.imageData} />}
            </div>

        );
    };
}

export default ExportToImage;