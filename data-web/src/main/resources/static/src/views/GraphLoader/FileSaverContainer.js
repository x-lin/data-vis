import React from "react";
import { connect } from "react-redux";

import FileSaver from "./FileSaver";

class FileSaverContainer extends React.Component {
    handleSave() {
        const blob = new Blob(
            [JSON.stringify(this.props.graph)],
            { type: "text/plain;charset=utf-8" }
        );
        const filename = `graph-${Date.now()}.json`;
        saveAs(blob, filename);
    }

    render() {
        return <FileSaver handleSave={(event) => this.handleSave(event)} />;
    }
}

FileSaverContainer.propTypes = {
    graph: React.PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        graph: state.graph.present
    };
};

const mapDispatchProps = () => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(FileSaverContainer);
