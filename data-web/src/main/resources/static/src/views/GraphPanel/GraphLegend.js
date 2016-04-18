import React from "react";
import ReactDOM from "react-dom";

import Constants from "../../config/Constants";

class GraphLegend extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: null,
            height: null
        };
    }

    componentDidUpdate() {
        this.updateBBox();
    }

    updateBBox() {
        const bbox = ReactDOM.findDOMNode(this).getBBox();

        if (this.state.width !== bbox.width) {
            this.setState({
                width: bbox.width,
                height: bbox.height
            });
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
        const { visibilityFilters, toggleFilterItemCategory, divId } = this.props;

        const g = this.createData().map((element, index) => {
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
            <svg
              id={divId}
              width={this.calcLength(this.state.width)}
              height={this.calcLength(this.state.height)}
            >
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
