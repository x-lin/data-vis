import React from "react";

import Draggable from "react-draggable";
import SchemaComponent from "../SchemaPanel/SchemaComponent";

export default class extends React.Component {
    render() {
        var drags = {onStart: () => this.onStart(), onStop: () => this.onStop()};
        return (
            <div>

                <div className="floatRight">
                    <SchemaComponent />
                </div>
            </div>
        );
    };

    constructor(props) {
        super(props);

        this.state = {
            activeDrags: 0
        };
    }

    onStart() {
        this.setState({activeDrags: ++this.state.activeDrags});
    }

    onStop() {
        this.setState({activeDrags: --this.state.activeDrags});
    }
}