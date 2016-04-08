import React from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import LaneComponent from "./LaneComponent";
import LeftSideBar from "../widgets/LeftSideBar";
import "./LanePicker.css";

import SideBarHeader from "../widgets/SideBarHeader";
import "../widgets/SideBarHeader.css";

class LanePicker extends React.Component {
  render() {
    return (
          <LaneComponent />
    );
  }
}

export default DragDropContext(HTML5Backend)(LanePicker);
