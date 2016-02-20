import React from "react";

import d3 from "d3";

import ForceGraphComponent from "./ForceGraphComponent";
import GraphLegend from "./GraphLegend";
import "./GraphLegend.css";
import "./ForceGraphComponent.css"

class D3Panel extends React.Component {
    render() {
        return (
            <div>
                <GraphLegend divId={"graph-legend"}/>
                <ForceGraphComponent divId={"force-graph-component"} />
            </div>
        );
    };
}

export default D3Panel;