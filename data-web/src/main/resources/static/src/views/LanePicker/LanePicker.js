import React from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import LaneComponent from "./LaneComponent";
import LeftSideBar from "../widgets/LeftSideBar";

class App extends React.Component {
  render() {
    return (
      <LeftSideBar>
          <LaneComponent />
      </LeftSideBar>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
