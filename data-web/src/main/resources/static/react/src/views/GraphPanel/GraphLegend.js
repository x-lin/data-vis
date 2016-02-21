import React from "react";

import Constants from "../../config/Constants";

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: "100%",
            height: "100%",
            data: createData()
        };
    }

    componentDidMount(){
        const bbox = document.getElementById(this.props.divId).getBBox();
        if (bbox) {
            const padding = 15;
            const extra = 10;

            this.setState({
                width: bbox.width + 2*padding + extra,
                height: bbox.height + 2*padding + extra
            });
        }
    }

    toggleCategoryFilter(name) {
        this.props.toggleFilterItemCategory(name);
    }

    render() {
        const g = () => {
            return this.state.data.map((element, index) => {
                const yTranslate = index*25+10;
                const opacity = this.props.visibilityFilters[element.name] ? "1" : "0.6";

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
                <svg id={this.props.divId} width={this.state.width} height={this.state.height}>
                    {g()}
                </svg>
        );
    };
}

const createData = () => {
    var data = [];

    for (var name in Constants.colorMap) {
        data.push({
            name: Constants.reversePropertyMap[name],
            color: Constants.colorMap[name]
        })
    }

    return data;
};