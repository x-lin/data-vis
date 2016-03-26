import React from "react";
import ReactDOM from "react-dom";

import { Overlay, Tooltip } from "react-bootstrap";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Overlay
                show={true}
                target={() => ReactDOM.findDOMNode(this.props.target)}
                placement="right"
                container={this}
            >
                <Tooltip className="in"
                         id="actual-tooltip"
                >
                    {this.props.tooltip}
                </Tooltip>
            </Overlay>
        )
    }
};