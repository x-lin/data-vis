import React from "react";
import { connect } from "react-redux";

import FileLoader from "./FileLoader";
import { updateGraph } from "../../actions/action-creators/GraphActions";

class FileLoaderContainer extends React.Component {
    handleLoad(event) {
        const { updateGraph } = this.props;

        const file = event.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const graph = JSON.parse(e.target.result);
            this.prepare(graph);

            updateGraph(graph);
        };
        reader.readAsText(file);
    }

    prepare(graph) {
        // set isFixed value, as it's not saved in file
        graph.nodes = graph.nodes.map((node) => {
            node.isFixed = (node.fixed && node.fixed === 1);
            return node;
        });

        // resetting edges to indices, otherwise D3 will not recognize and render the edges
        // this way D3 creates the references to the nodes itself
        graph.edges = graph.edges.map((edge) => {
            edge.source = edge.source.index;
            edge.target = edge.target.index;
            return edge;
        });
    }

    render() {
        return <FileLoader title={this.props.hasLabel ? "Load Graph" : ""} handleLoad={(event) => this.handleLoad(event)} />;
    }
}

FileLoaderContainer.propTypes = {
    hasLabel: React.PropTypes.bool,
    updateGraph: React.PropTypes.func.isRequired,
    graph: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        graph: state.graph
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        updateGraph: (data) => {
            dispatch(updateGraph(data));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(FileLoaderContainer);
