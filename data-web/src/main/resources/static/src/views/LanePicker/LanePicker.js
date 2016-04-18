import React from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import LaneComponent from "./LaneContainer";
import LeftSideBar from "../widgets/LeftSideBar";

import SideBarHeader from "../widgets/SideBarHeader";

class LanePicker extends React.Component {
  render() {
    return (
          <LaneComponent />
    );
  }
}

export default DragDropContext(HTML5Backend)(LanePicker);
