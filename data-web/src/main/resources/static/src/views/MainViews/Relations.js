import React from "react";

import SearchBarComponent from "../SearchBar/SearchBarComponent";
import GraphPanel from "../GraphPanel/GraphPanel";
import ExportToImage from "../GraphPanel/ExportToImage"
import FilterSideBar from "../GraphPanel/FilterSideBar/FilterSideBar";
import Draggable from "./Draggable";
import LanePicker from "../LanePicker/LanePicker";
import TestCoverage from "../TestCoveragePanel/TestCoverageTable";

export default () => {
    return (
        <div>
            <LanePicker />
            <SearchBarComponent />
            {/*<ExportToImage />*/}
            <div style={{height: "100vh"}}>
                <GraphPanel />
            </div>
            {/*<Draggable />*/}
        </div>
    );
}