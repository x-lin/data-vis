import React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import LaneContainer from "./LaneContainer";

class LanePicker extends React.Component {
    render() {
        return (
            <LaneContainer />
        );
    }
}

export default DragDropContext(HTML5Backend)(LanePicker);
