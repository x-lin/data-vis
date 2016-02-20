import React from "react";

import Constants from "../../config/Constants";

export default class extends React.Component {
    render() {
        const g = () => {
            const data = createData();

            return data.map((element, index) => {
                const yTranslate = index*25+10;

                return (
                    <g key={index} transform={`translate(10,${yTranslate})`}>
                        <circle r="10" fill={element.color} />
                        <text x="20" alignment-baseline="middle">{element.name}</text>
                    </g>);
            });
        };

        return (
            <svg id={this.props.divId} width="100%" height="100%">
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