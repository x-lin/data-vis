import React from "react";

import Constants from "../../config/Constants";

class GraphLegend extends React.Component {
    componentDidUpdate() {
        const bbox = $("#"+ this.props.divId)[0].getBBox();

        if (bbox) {
            const padding = 15;
            const extra = 10;

            $("#"+ this.props.divId)
                .attr("width", bbox.width + 2 * padding + extra)
                .attr("height", bbox.height + 2 * padding + extra);
        }
    }

    createData() {
        const data = [];

        this.props.legend.legend.forEach((legend) => {
            data.push({
                name: legend,
                color: Constants.getColor(legend)
            });
        });

        return data;
    }

    calcLength(size) {
        const padding = 15;
        const extra = 10;

        return size + 2 * padding + extra;
    }

    render() {
        const data = this.createData();
        const { visibilityFilters, toggleFilterItemCategory, divId } = this.props;

        const g = data.map((element, index) => {
            const yTranslate = index * 25 + 10;
            const opacity = (!visibilityFilters.hasOwnProperty(element.name) || visibilityFilters[element.name]) ?
                "1" : "0.6";

            return (
                <g className="graph-legend-g" key={index} transform={`translate(10,${yTranslate})`}
                  onClick={() => toggleFilterItemCategory(element.name)}
                  opacity={opacity}
                >

                    <circle r="10" fill={element.color} />
                    <text x="20" y="5">{element.name}</text>
                </g>);
        });

        return (
            <svg id={divId}>
                {g}
            </svg>
        );
    }
}

GraphLegend.propTypes = {
    toggleFilterItemCategory: React.PropTypes.func.isRequired,
    visibilityFilters: React.PropTypes.object.isRequired,
    legend: React.PropTypes.object.isRequired,
    divId: React.PropTypes.string.isRequired
};

export default GraphLegend;
