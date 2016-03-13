import React from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../../config/itemTypes';
import flow from "lodash/flow";

class Note extends React.Component {
  render() {
    const {connectDragSource, connectDropTarget, isDragging, editing} = this.props;
    // Pass through if we are editing
    const dragSource = editing ? a => a : connectDragSource;

    return dragSource(connectDropTarget(
      <li style={{
        opacity: isDragging ? 0 : 1
      }} className={this.props.className}>{this.props.note.key}</li>
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

export default flow(
    DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })),
    DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
      connectDropTarget: connect.dropTarget()
    }))
)(Note);