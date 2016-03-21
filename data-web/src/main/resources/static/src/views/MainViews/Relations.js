import React from "react";

import SearchBarComponent from "../SearchBar/SearchBarComponent";
import GraphPanel from "../GraphPanel/GraphPanel";
import ExportToImage from "../GraphPanel/ExportToImage"
import Draggable from "./Draggable";
import TestCoverage from "../TestCoveragePanel/TestCoverageTable";

export default () => {
    return (
        <div>
            <SearchBarComponent />
            {/*<ExportToImage />*/}
            <div style={{height: "100vh"}}>
                <GraphPanel />
            </div>
            {/*<Draggable />*/}
        </div>
    );
}