import React from 'react';
import Notes from './Notes';
import {DropTarget} from 'react-dnd';
import ItemTypes from '../../config/itemTypes';
import SideBarCollapsable from "../widgets/SideBarCollapsable";

class Lane extends React.Component {
  render() {

    const {connectDropTarget, lane} = this.props;

    return connectDropTarget(
      <div>
        <SideBarCollapsable title={lane.key} >
          <Notes notes={this.props.notes} move={this.props.move} />
        </SideBarCollapsable>
      </div>
    );
  }
}

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceNote = sourceProps.note;

    if(!targetProps.lane.notes.length) {
      targetProps.attachToLane(targetProps.lane.id, sourceNote);
    }
  }
};

export default DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))(Lane);

