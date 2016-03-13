import React from "react";

import Draggable from "react-draggable";
import SchemaComponent from "../SchemaPanel/SchemaComponent";
import SchemaSideBar from "../SchemaPanel/SchemaSideBar";

export default class extends React.Component {
    render() {
        var drags = {onStart: () => this.onStart(), onStop: () => this.onStop()};
        return (
            <div>
                <SchemaSideBar project={this.props.params.project} searchSchema={this.props.searchSchema} />
                <SchemaComponent project={this.props.params.project} />
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