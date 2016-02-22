import React from "react";

import GraphLoaderPresentation from "./GraphLoaderPresentation";

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startSave: false
        }
    }

    handleSave(event) {
        const blob = new Blob([JSON.stringify(this.props.graph)], {type: "text/plain;charset=utf-8"});
        const filename = `graph-${Date.now()}.json`;
        saveAs(blob, filename);
    }

    handleLoad(event) {
        const { updateGraph } = this.props;

        var file = event.target.files[0];
        if (!file) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function(e) {
            var graph = JSON.parse(e.target.result);

            //resetting edges to indices, otherwise D3 will not recognize and render the edges
            //this way D3 creates the references to the nodes itself
            graph.edges = graph.edges.map((edge, index) => {
                edge.source = edge.source.index;
                edge.target = edge.target.index;
                return edge;
            });

            updateGraph(graph);
        };
        reader.readAsText(file);
    }

    render() {
        return (
            <GraphLoaderPresentation
                onSave={(event) => this.handleSave(event)}
                onLoad={(event) => this.handleLoad(event)}
            />
        )
    }
}