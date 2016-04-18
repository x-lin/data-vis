import React from "react";
import { connect } from "react-redux";

import NewGraph from "./NewGraph";
import { clearGraph } from "../../actions/action-creators/GraphActions";

class NewGraphContainer extends React.Component {
    handleClick() {
        this.props.clearGraph();
    }

    render() {
        return <NewGraph handleClick={() => this.handleClick()} />;
    }
}

NewGraphContainer.propTypes = {
    clearGraph: React.PropTypes.func.isRequired
};

const mapDispatchProps = (dispatch) => {
    return {
        clearGraph: () => {
            dispatch(clearGraph());
        }
    };
};

export default connect(
    null,
    mapDispatchProps
)(NewGraphContainer);
