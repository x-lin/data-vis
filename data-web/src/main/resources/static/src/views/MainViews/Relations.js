import React from "react";

import SearchBarComponent from "../SearchBar/SearchBarComponent";
import GraphPanel from "../GraphPanel/GraphPanel";
import ExportToImage from "../GraphPanel/ExportToImage"
import FilterSideBar from "../GraphPanel/FilterSideBar/FilterSideBar";
import Draggable from "./Draggable";

export default () => {
    return (
        <div>
            <FilterSideBar />
            <SearchBarComponent />
            {/*<ExportToImage />*/}
            <GraphPanel />
            {/*<Draggable />*/}
        </div>
    );
}