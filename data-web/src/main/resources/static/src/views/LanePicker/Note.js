import React from "react";
import { DragSource, DropTarget } from "react-dnd";
import _flow from "lodash/flow";

import ItemTypes from "../../config/itemTypes";
import Constants from "../../config/Constants";
import CircleSpan from "../widgets/CircleSpan";
import { DESIGN, REQUIREMENT, TEST } from "../../config/Defaults";

const getType = (key) => {
    if (DESIGN.indexOf(key) !== -1) {
        return "DES";
    } else if (TEST.indexOf(key) !== -1) {
        return "TES";
    } else if (REQUIREMENT.indexOf(key) !== -1) {
        return "REQ";
    } else {
        return "OTH";
    }
};

const getColor = (type) => {
    switch (type) {
        case "DES":
            return "#999";
        case "TES":
            return "#555";
        case "REQ":
            return "#111";
        default:
            return "#DDD";
    }
};

class Note extends React.Component {
    render() {
        const { connectDragSource, connectDropTarget, isDragging, editing } = this.props;

        // Pass through if we are editing
        const dragSource = editing ? a => a : connectDragSource;
        const type = getType(this.props.note.key);

        return dragSource(connectDropTarget(
          <li style={{
            opacity: isDragging ? 0 : 1
          }} className={this.props.className}>
              <span className="vertical-label" style={{backgroundColor: getColor(type)}}>{type}</span>
            <CircleSpan radius="8px" color={Constants.getColor(this.props.note.name)} />
            &nbsp;
        {this.props.note.name.length > 29 ? this.props.note.name.substring(0,29)+"..." : this.props.note.name}</li>
        ));
    }
}

const noteSource = {
  beginDrag(props) {
    return {
      id: props.id,
      note: props.note
    };
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  }
};

const noteTarget = {
  hover(targetProps, monitor) {
    const targetNote = targetProps.note;
    const sourceProps = monitor.getItem();
    const sourceNote = sourceProps.note;

    if(sourceNote !== targetNote) {
      targetProps.onMove(sourceNote, targetNote);
    }
  }
};

export default _flow(
    DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })),
    DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
      connectDropTarget: connect.dropTarget()
    }))
)(Note);