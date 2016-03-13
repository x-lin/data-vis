import React from "react";

import SearchBarComponent from "../SearchBar/SearchBarComponent";
import GraphPanel from "../GraphPanel/GraphPanel";
import ExportToImage from "../GraphPanel/ExportToImage"
import FilterSideBar from "../GraphPanel/FilterSideBar/FilterSideBar";
import Draggable from "./Draggable";
import LanePicker from "../LanePicker/LanePicker";

export default () => {
    return (
        <div>
            <LanePicker />
            <SearchBarComponent />
            {/*<ExportToImage />*/}
            <GraphPanel />
            {/*<Draggable />*/}
        </div>
    );
}