import React from "react";

import Constants from "../../config/Constants";

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: "100%",
            height: "100%"
        };
    }

    componentDidMount(){
        const bbox = $("#"+ this.props.divId)[0].getBBox();
        if (bbox) {
            const padding = 15;
            const extra = 10;

            this.setState({
                width: 200,
                height: 400
            });
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

        //for(let name in this.props.legend.legend) {
        //    data.push({
        //        name: name,
        //        color: Constants.getColor(name)
        //    })
        //}

        //for (var name in Constants.colorMap) {

        //        name: Constants.reversePropertyMap[name],
        //        color: Constants.colorMap[name]
        //    })
        //}

        return data;
    };

    render() {
        const g = () => {
            return this.createData().map((element, index) => {
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