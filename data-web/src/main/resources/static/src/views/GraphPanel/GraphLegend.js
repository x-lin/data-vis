import React from "react";

import Constants from "../../config/Constants";

export default class extends React.Component {
    componentDidUpdate(){
        const bbox = $("#"+ this.props.divId)[0].getBBox();

        if (bbox) {
            const padding = 15;
            const extra = 10;

            $("#"+ this.props.divId)
                .attr("width", bbox.width + 2*padding + extra)
                .attr("height", bbox.height + 2*padding + extra);
        }
    }

    toggleCategoryFilter(name) {
        this.props.toggleFilterItemCategory(name);
    }

    createData() {
        var data = [];

        this.props.legend.legend.forEach((legend) => {
            data.push({
                name: legend,
                color: Constants.getColor(legend)
            })
        })

        return data;
    };

    render() {
        const g = () => {

            return this.createData().map((element, index) => {
                const yTranslate = index*25+10;
                let opacity = 1;

                if(this.props.visibilityFilters.hasOwnProperty(element.name)) {
                    opacity = this.props.visibilityFilters[element.name] ? "1" : "0.6";
                }

                return (
                    <g className="graph-legend-g" key={index} transform={`translate(10,${yTranslate})`}
                        onClick={(e) => this.toggleCategoryFilter(element.name)}
                        opacity={opacity}>

                        <circle r="10" fill={element.color} />
                        <text x="20" y="5">{element.name}</text>
                    </g>);
            });
        };

        return (
                <svg id={this.props.divId}>
                    {g()}
                </svg>
        );
    };
}