
import React from "react";

import d3 from "d3";

import Constants from "../../config/Constants";

class D3Legend extends React.Component {
    renderD3Legend(divId) {
        d3.select("#" + divId).select("svg").remove();
        var svg1 = d3.select("#" + divId).append("svg")
            .attr("width", "100%")
            .attr("height", "100%")

        var colorArray = [];
        var i = 0;
        for (var color in Constants.colorMap) {
            colorArray.push({
                name: Constants.reversePropertyMap[color],
                color: Constants.colorMap[color],
                index: i++
            })
        }

        svg1.selectAll("g")
            .data(colorArray)
            .enter()
            .append("g")
            .attr("transform", function (d) {
                return "translate(10," + (d.index * 25 + 10) + ")";
            })
            .append("circle")
            .attr("r", 10)
            .attr("fill", function (d) {
                return d.color
            });

        var g = svg1.selectAll("g")
            .append("text")
            .attr("x", 20)
            .attr("alignment-baseline", "middle")
            .text(function (d) {
                return d.name
            });

        var bbox = svg1.node().getBBox();

        svg1.attr("width", bbox.width)
            .attr("height", bbox.height);
    }

    componentDidMount() {
        this.renderD3Legend(this.props.divId);
    }

    render() {
        return (
            <div id={this.props.divId}></div>
        );
    };
}

export default D3Legend;