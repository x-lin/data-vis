import React from "react";

import Draggable from "react-draggable";

export default class extends React.Component {
    render() {
        var drags = {onStart: () => this.onStart(), onStop: () => this.onStop()};
        return (
            <div>
                <Draggable zIndex={100} {...drags}>
                    <div className="floatRight">
                        <div className="box box-default grey-box">
                            <div className="box-header with-border">
                                <h3 className="box-title">Visitors Report</h3>
                            </div>
                            <div className="box-body">
                                dfsdfs
                            </div>
                        </div>
                    </div>
                </Draggable>
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