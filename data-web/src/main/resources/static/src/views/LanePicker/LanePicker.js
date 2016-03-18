import React from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import LaneComponent from "./LaneComponent";
import LeftSideBar from "../widgets/LeftSideBar";
import "./LanePicker.css";

import SideBarHeader from "../widgets/SideBarHeader";
import "../widgets/SideBarHeader.css";
import FilterSideBar from "../GraphPanel/FilterSideBar/filterSideBar";

class LanePicker extends React.Component {
  render() {
    return (
      <LeftSideBar>
          <ul className="nav nav-tabs nav-justified control-sidebar-tabs">
              <li className="active"><a href="#left-sidebar-settings-tab" data-toggle="tab"><i className="fa fa-filter" /></a></li>
              <li><a href="#left-sidebar-home-tab" data-toggle="tab"><i className="fa fa-sliders" /></a></li>
          </ul>

          <div className="tab-content">
              <div className="tab-pane active" id="left-sidebar-settings-tab">
                  <LaneComponent />
              </div>

              <div className="tab-pane" id="left-sidebar-home-tab">
                  <FilterSideBar />
              </div>

          </div>


      </LeftSideBar>
    );
  }
}

export default DragDropContext(HTML5Backend)(LanePicker);
