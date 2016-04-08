import React from "react";

import FileLoadingButton from "../widgets/FileLoadingButton";

export default class extends React.Component {
    handleLoad(event) {
        const { updateGraph } = this.props;
        const prepare = this.prepare;

        var file = event.target.files[0];
        if (!file) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function(e) {
            var graph = JSON.parse(e.target.result);
            prepare(graph);

            updateGraph(graph);
        };
        reader.readAsText(file);
    }

    prepare(graph) {
        //set isFixed value, as it's not saved in file
        graph.nodes = graph.nodes.map((node, index) => {
            node.isFixed = (node.fixed && node.fixed==1) ? true : false;
            return node;
        });

        //resetting edges to indices, otherwise D3 will not recognize and render the edges
        //this way D3 creates the references to the nodes itself
        graph.edges = graph.edges.map((edge, index) => {
            edge.source = edge.source.index;
            edge.target = edge.target.index;
            return edge;
        });
    }

    render() {
        return <FileLoadingButton
            buttonClass="btn-file"
            iconClass="fa fa-folder-open"
            onChange={(event) => this.handleLoad(event)}
            title={this.props.hasLabel ? "Load Graph" : ""}
        />
    }
}